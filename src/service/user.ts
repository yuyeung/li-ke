import User from "../model/User";
import { APIError } from "../utils";

const USER_NOT_FOUND = new APIError('user:not_found', '未找到该用户');

export const getUser = async (where: any) => {
  const user = await User.findOne({ where });
  if (user === null) { throw USER_NOT_FOUND; }
  return user;
};
