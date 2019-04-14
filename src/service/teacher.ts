import Teacher from "../model/Teacher";
import { APIError } from "../utils";

const TEACHER_NOT_FOUND = new APIError('teacher:not_found', '未找到该教师');

export const getTeacher = async (where: any) => {
  const teacher = await Teacher.findOne({ where });
  if (teacher === null) { throw TEACHER_NOT_FOUND; }
  return teacher;
};
