import mongoose from 'mongoose';
import confing from '../../confing';
import { AcademicSemester } from '../AcademicSemester/academic.semester.model';
import { TStudent } from '../student/student.interface';
import students from '../student/student.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utility';
import { Tusers } from './users.interface';
import Users from './users.model';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academic.department.model';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

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
const createFacultyForDb = async (password: string, playood: TFaculty) => {
  //create user object
  const userData: Partial<Tusers> = {};

  //set defult password---------
  userData.password = password || (confing.defult_password as string);

  //set role--------
  userData.role = 'faculty';

  const academicDepartment = await AcademicDepartment.findById(
    playood.academicDepartment
  );

  if (!academicDepartment) {
    throw new AppError(400, 'academic department is not found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set generate id
    userData.id = await generateFacultyId();
    //create user
    const newUser = await Users.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create user');
    }

    //set id

    playood.id = newUser[0].id;
    playood.user = newUser[0]._id;

    const newFaculty = await Faculty.create([playood], { session });

    if (!newFaculty.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();
    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminForDb = async (password: string, playood: TAdmin) => {
  const userData: Partial<Tusers> = {};
  //set password
  userData.password = password || (confing.defult_password as string);

  //set role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // generat user id

    userData.id = await generateAdminId();
    //create user
    const newUser = await Users.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create user');
    }

    playood.id = newUser[0].id;
    playood.user = newUser[0]._id;

    const createAdmin = await Admin.create([playood], { session });
    if (!createAdmin.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const usersServices = {
  createStudentForDB,
  createFacultyForDb,
};
