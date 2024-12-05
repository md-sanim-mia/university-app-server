import { late } from 'zod';
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
  return lastStudent?.id ? lastStudent.id : undefined;
};

//--------- generate autmitc student id ----------
export const generateStudentId = async (playood: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();
  console.log(lastStudentId);
  if (lastStudentId) {
    const lastStudentSemesterCode = lastStudentId.substring(4, 6);
    const lastStudentYear = lastStudentId.substring(0, 4);
    const currentSemesterCode = playood.code;
    const currentSemesterYear = playood.year;

    if (
      lastStudentSemesterCode === currentSemesterCode &&
      lastStudentYear === currentSemesterYear
    ) {
      currentId = lastStudentId.substring(6);
    }
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  console.log(incrementId);
  incrementId = `${playood.year}${playood.code}${incrementId}`;
  console.log(incrementId);
  return incrementId;
};
