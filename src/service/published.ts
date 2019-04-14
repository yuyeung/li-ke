import Organization from '../model/Organization';
import Published from '../model/Published';
import Teacher from "../model/Teacher";
import User from "../model/User";
import {APIError} from '../utils';

const PUBLISHED_NOT_FOUND = new APIError('published:not_found', '未找到该课程');
const PUBLISHEDLIST_NOT_FOUND = new APIError('publishedlist:not_found', '未找到该课程列表');

export const getPublished = async (where: any) => {
  const result = await Published.findOne(where);
  if (result === null) {
    throw PUBLISHED_NOT_FOUND;
  }
  return result;
};

export const getPublishedList = async (query: any) => {
  const user = await User.findById(query.userId);
  const queryP = {
    attributes: ['id', 'name', 'prototypeId', 'content'],
    include: [
      {
        attributes: ['id', 'name'],
        model: Organization,
      },
    ],
    limit: query.limit,
    offset: query.offset,
    where: {},
  };
  // 默认type===1为教师，type===2为学院
  if (user.type === 1) {
    const teacher = await Teacher.findOne({where: {userId: query.userId}});
    queryP.where = {teacherId: teacher.id};
  } else if (user.type === 2) {
    const organization = await Organization.findOne({where: {userId: query.userId}});
    queryP.where = {organizationId: organization.id};
  }
  const result = await Published.findAndCountAll(queryP);
  if (result.count === 0) {
    throw PUBLISHEDLIST_NOT_FOUND;
  }
  return result;
};
