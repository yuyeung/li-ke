import * as jwt from 'jsonwebtoken';
import * as util from 'util';
import config from './config';

export class APIError {
  constructor(public code: string, public message: string) {}
}
export const signJWT = (payload: any) => util.promisify(jwt.sign)(payload, config.JWT.secret);
export const verifyJWT = (token: string) => util.promisify(jwt.verify)(token, config.JWT.secret);
