import confing from '../../confing';
import { TStudent } from '../student/student.interface';
import students from '../student/student.model';
import { Tusers } from './users.interface';

import Users from './users.model';

const createStudentForDB = async (password: string, studentData: TStudent) => {
  //create user object
  const userData: Partial<Tusers> = {};

  //set defult password---------
  userData.password = password || (confing.defult_password as string);

  //---set student role ---

  userData.role = 'student';

  //-----set munilly student id -------
  userData.id = '2030100001';
  const NewUsers = await Users.create(userData);
  //create student
  if (Object.keys(NewUsers).length) {
    studentData.id = NewUsers.id;
    studentData.user = NewUsers._id;
    const newStudent = await students.create(studentData);
    return newStudent;
  }

  return NewUsers;
};

export const usersServices = {
  createStudentForDB,
};
