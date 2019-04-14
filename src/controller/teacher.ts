import { Context } from 'koa';
import Teacher from '../model/Teacher';
import User from '../model/User';
import * as teacherService from '../service/teacher';
import { APIError } from '../utils';

const PARAMS_VALIDATE_ERROR = new APIError('teacher:params_validate_error', '参数校验失败');

// PUT /teacher
// Body: intro, avatar
// Desc: 教师更新自己的信息
export const update = async (ctx: Context) => {
  ctx.checkBody('intro').notEmpty();
  ctx.checkBody('avatar').notEmpty();
  if (ctx.errors) { throw PARAMS_VALIDATE_ERROR; }
  const { intro, avatar } = ctx.request.body;
  const { id } = ctx.state.user;
  const teacher = await teacherService.getTeacher({ userId: id });
  teacher.intro = intro;
  teacher.avatarUrl = avatar;
  await teacher.save();
  ctx.status = 204;
};
