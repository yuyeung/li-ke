import { Middleware } from 'koa';
import { APIError, verifyJWT } from '../utils';

const AUTH_FAIL_ERROR = new APIError('auth:auth_fail_error', 'auth fail.');

const auth: Middleware = async (ctx, next) => {
  try {
    // 模拟用户登录
    ctx.state.user = {id: 1, type: 1};
    ctx.state.published = {id: 1};
    // const val: string = ctx.headers.authorization; // lowercase only
    // const matchResult = val.match(/Bearer (.*)/);
    // const token = matchResult[1];
    // await verifyJWT(token);
  } catch (err) {
    console.log(err);
    throw AUTH_FAIL_ERROR;
  }
  await next();
};

export default auth;
