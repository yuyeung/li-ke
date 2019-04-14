import { Context } from 'koa';
import Prototype from '../model/Prototype';
import * as prototypeService from '../service/prototype';
import * as teacherService from '../service/teacher';
import * as userService from '../service/user';
import { APIError } from '../utils';

const PARAMS_VALIDATE_ERROR = new APIError('prototype:params_validate_error', '参数校验失败');
const enum status { Initial, Available, Unavailable }

// POST /prototypes
// Body: name, content
// Desc: 创建原型
export const create = async (ctx: Context) => {
  ctx.checkBody('name').notEmpty();
  ctx.checkBody('content').notEmpty();
  if (ctx.errors) { throw PARAMS_VALIDATE_ERROR; }
  const { name, content } = ctx.request.body;
  const teacher = await teacherService.getTeacher({ userId: ctx.state.user.id});
  const { id } = teacher;
  const prototype = await prototypeService.postPrototype({ name, content, status: status.Initial, teacherId: id });
  ctx.status = 204;
};

// PUT /prototypes/:id
// Body: name, content
// Desc: 更新原型
export const update = async (ctx: Context) => {
  ctx.checkParams('id').notEmpty().isInt().toInt();
  ctx.checkBody('name').notEmpty();
  ctx.checkBody('content').notEmpty();
  if (ctx.errors) { throw PARAMS_VALIDATE_ERROR; }
  const id = ctx.params.id;
  const { name, content } = ctx.request.body;
  const teacher = await teacherService.getTeacher({ userId: ctx.state.user.id});
  const teacherId = teacher.id;
  const prototype = await prototypeService.getPrototype({ id, teacherId });
  prototype.content = content;
  prototype.name = name;
  await prototype.save();
  ctx.status = 204;
};

// DELETE /prototypes/:id
// Params: id
// Desc: 删除原型
export const remove = async (ctx: Context) => {
  ctx.checkParams('id').notEmpty();
  if (ctx.errors) { throw PARAMS_VALIDATE_ERROR; }
  const teacher = await teacherService.getTeacher({ userId: ctx.state.user.id});
  const id = ctx.params.id;
  await prototypeService.deletePrototype({ id, teacherId: teacher.id });
  ctx.status = 204;
};

// GET /prototypes/:id
// Params: id
// Desc: 获取原型信息
export const getMessage = async (ctx: Context) => {
  ctx.checkParams('id').notEmpty();
  if (ctx.errors) { throw PARAMS_VALIDATE_ERROR; }
  const id = ctx.params.id;
  const prototype = await prototypeService.getPrototype({ id });
  const user = await userService.getUser({ id: ctx.state.user.id });
  const teacher = await teacherService.getTeacher({ id: prototype.teacherId });
  const { name, content } = prototype;
  const teacherInfo = {
    account: user.account,
    avatar: user.avatarUrl,
    id: teacher.id,
    name: user.name,
    unit: teacher.unit,
  };
  ctx.response.body = JSON.stringify({ name, content, teacher: teacherInfo});
  ctx.body = { name, content, teacher: teacherInfo };
};

// GET /prototypes
// Query: limit, offset
// Desc: 获取原型列表
export const getList = async (ctx: Context) => {
  ctx.checkQuery('limit').notEmpty().isInt().toInt();
  ctx.checkQuery('offset').notEmpty().isInt().toInt();
  if (ctx.errors) { throw PARAMS_VALIDATE_ERROR; }
  const prototypes = await prototypeService.listPrototype(ctx.query.limit, ctx.query.offset);
  const data: Array<{ id: number; name: string; }> = [];
  prototypes.rows.forEach((prototype) => { data.push({ id: prototype.id, name: prototype.name }); });
  ctx.response.body = JSON.stringify({ data, count: prototypes.count });
  ctx.body = { data, count: prototypes.count };
};
