import {Context} from 'koa';

import Organization from '../model/Organization';
import Prototype from '../model/Prototype';
import * as publishedService from '../service/published';
import {APIError} from '../utils';

const PARAMS_VALIDATE_ERROR = new APIError('published:params_validate_error', '参数校验失败');
const DELETE_ERROR = new APIError('published:delete_error', '课程删除失败');
const GET_ERROR = new APIError('published:get_error', '课程获取失败');
const GETLIST_ERROR = new APIError('published:getlist_error', '课程列表获取失败');

// PUT /published:id
// Body: name, content
// Params: id
// Desc: 教师？学院？更新课程信息
export const update = async (ctx: Context) => {
  ctx.checkBody('name').notEmpty();
  ctx.checkBody('content').notEmpty();
  ctx.checkParams('id').isInt().toInt();
  if (ctx.errors) {
    throw PARAMS_VALIDATE_ERROR;
  }
  const {name, content} = ctx.request.body;
  //  获取当前课程id
  const id = ctx.params.id;
  const published = await publishedService.getPublished({where: {id}});
  published.name = name;
  published.content = content;
  await published.save();
  ctx.status = 204;
};

// DELETE /published:id
// Params: id
// Desc: 教师？学院？删除课程信息
export const destroy = async (ctx: Context) => {
  ctx.checkParams('id').isInt().toInt();
  if (ctx.errors) {
    throw DELETE_ERROR;
  }
  const id = ctx.params.id;
  const published = await publishedService.getPublished({where: {id}});
  await published.destroy();
  ctx.status = 204;
};

// GET /published:id
// Params: id
// Desc: 教师或学院获取课程信息
export const findOne = async (ctx: Context) => {
  ctx.checkParams('id').isInt().toInt();
  if (ctx.errors) {
    throw GET_ERROR;
  }
  const id = ctx.params.id;
  const query = {
    include: [
      {
        attributes: ['id', 'name'],
        model: Organization,
      },
      {
        attributes: ['id', 'name', 'content', 'teacherId'],
        model: Prototype,
      },
    ],
    where: {id},
  };

  const result = await publishedService.getPublished(query);
  //  返回参数	{ name, organization: { id, name }, prototype: { id, name,content, teacher }, content }
  ctx.response.body = {
    content: result.content,
    name: result.name,
    organization: result.organization,
    prototype: result.prototype,
  };
};

// GET /published
// Query: limit, offset
// Desc: 教师或学院获取课程信息
export const findAll = async (ctx: Context) => {
  ctx.checkQuery('limit').optional().isInt().toInt();
  ctx.checkQuery('offset').optional().isInt().toInt();
  if (ctx.errors) {
    throw GETLIST_ERROR;
  }
  //  获取用户id,根据type查找学院或老师发布的课程
  const {id} = ctx.state.user;
  const query = {
    limit: ctx.query.limit,
    offset: ctx.query.offset,
    userId: id,
  };
  const publishedlist = await publishedService.getPublishedList(query);

  //  返回参数    { data: [{ id, name, organization: { id, name}, content, prototype_id }], count }
  ctx.body = {
    count: publishedlist.count,
    data: publishedlist.rows,
  };
};
