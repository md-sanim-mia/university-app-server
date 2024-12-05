import mongoose from 'mongoose';
import confing from '../../confing';
import { AcademicSemester } from '../AcademicSemester/academic.semester.model';
import { TStudent } from '../student/student.interface';
import students from '../student/student.model';
import { generateStudentId } from './user.utility';
import { Tusers } from './users.interface';
import Users from './users.model';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

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

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //-----set  student id -------
    userData.id = await generateStudentId(admissionSemester);
    const newUsers = await Users.create([userData], { session });
    //create student
    if (!newUsers.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create users');
    }
    playood.id = newUsers[0].id;
    playood.user = newUsers[0]._id;
    const newStudent = await students.create([playood], { session });
    if (!newStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create student');
  }
};

export const usersServices = {
  createStudentForDB,
};
