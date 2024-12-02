import confing from '../../confing';
import { AcademicSemester } from '../AcademicSemester/academic.semester.model';
import { TStudent } from '../student/student.interface';
import students from '../student/student.model';
import { generateStudentId } from './user.utility';
import { Tusers } from './users.interface';
import Users from './users.model';

const createStudentForDB = async (password: string, playood: TStudent) => {
  //create user object
  const userData: Partial<Tusers> = {};

  //set defult password---------
  userData.password = password || (confing.defult_password as string);

  //---set student role ---

  userData.role = 'student';

  //find academic semester------
  const admissionSemester = await AcademicSemester.findById(
    playood.admissionSemester
  );
  if (!admissionSemester) {
    throw new Error('id can not finde');
  }
  //-----set  student id -------
  userData.id = await generateStudentId(admissionSemester);
  const NewUsers = await Users.create(userData);
  //create student
  if (Object.keys(NewUsers).length) {
    playood.id = NewUsers.id;
    playood.user = NewUsers._id;
    const newStudent = await students.create(playood);
    return newStudent;
  }

  return NewUsers;
};

export const usersServices = {
  createStudentForDB,
};
