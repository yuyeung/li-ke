import Prototype from "../model/Prototype";
import { APIError } from "../utils";

const PROTOTYPE_NOT_FOUND = new APIError('prototype:not_found', '未找到该课程信息');
const PROTOTYPE_CREATE_ERROT = new APIError('prototype:create_error', '课程信息有误');

export const getPrototype = async (where: any) => {
  const prototype = await Prototype.findOne({ where });
  if (prototype === null) { throw PROTOTYPE_NOT_FOUND; }
  return prototype;
};

export const postPrototype = async (message: object) => {
  const prototype = await Prototype.create(message);
  if (prototype === null) { throw PROTOTYPE_CREATE_ERROT; }
  return prototype;
};

export const deletePrototype = async (where: any) => {
  const prototype = await Prototype.destroy({ where });
  if (prototype === 0) { throw PROTOTYPE_NOT_FOUND; }
  return prototype;
};

export const listPrototype = async (limit: number, offset: number) => {
  const prototype = await Prototype.findAndCountAll({ limit, offset });
  if (prototype === null) { throw PROTOTYPE_NOT_FOUND; }
  return prototype;
};
