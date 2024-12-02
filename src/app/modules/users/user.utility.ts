import { TAcademicSemester } from '../AcademicSemester/academic.semester.interface';
import Users from './users.model';
const findLastStudentId = async () => {
  const lastStudent = await Users.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: 1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};
//--------- generate autmitc student id ----------
export const generateStudentId = async (playood: TAcademicSemester) => {
  const currentId = (0).toString();
  const lastStudentId = findLastStudentId();
  const lastStudentSemesterCode = lastStudentId.substring(6);
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${playood.year}${playood.code}${incrementId}`;

  return incrementId;
};
