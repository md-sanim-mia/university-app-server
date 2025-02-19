import mongoose from 'mongoose';
import students from './student.model';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import Users from '../users/users.model';
import { TStudent } from './student.interface';
import queryBulders from '../../builders/queryBuilders';
import { studentSearchbleFields } from './student.constan';

const getaAllStudentDB = async (query: Record<string, unknown>) => {
  // let serarchTerm = '';
  // const objectQurey = { ...query };
  // if (query?.serarchTerm) {
  //   serarchTerm = query?.serarchTerm as string;
  // }
  // const serarchQurey = students.find({
  //   $or: studentSearchbleFields.map((filed) => ({
  //     [filed]: { $regex: serarchTerm, options: 'i' },
  //   })),
  // });
  // //filtering
  // const excludeFields = ['serarchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete objectQurey[el]);
  // const filterQurey = serarchQurey
  //   .find(objectQurey)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: 'academicFaculty',
  //   });
  // let sort = '-createdAt';
  // if (query?.sort) {
  //   sort = query?.sort as string;
  // }
  // const sortQurey = filterQurey.sort(sort);
  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit) as number;
  // }
  // if (query.page) {
  //   limit = Number(query.page) as number;
  //   skip = (page - 1) * limit;
  // }
  // const paginagionQuery = sortQurey.skip(skip);
  // const limitedQurey = paginagionQuery.limit(limit);
  // //field limiting
  // let fields = '_v';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // const fieldsQuery = await limitedQurey.select(fields);
  // return fieldsQuery;

  const studentQuery = new queryBulders(
    students
      .find()
      .populate('admissionSemester')
      .populate('user')
      .populate({
        path: 'academicDepartment',
        populate: { path: 'academicFaculty' },
      }),
    query
  )
    .serarch(studentSearchbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  console.log(result);
  return result;
};

const singleStudentFromDB = async (studentId: string) => {
  const result = await students
    .findOne({ id: studentId })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  return result;
};

const updateSingleStudentFromDB = async (
  studentId: string,
  playood: Partial<TStudent>
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = playood;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }
  const result = await students.findOneAndUpdate(
    { id: studentId },
    modifiedUpdateData,
    {
      new: true,
    }
  );
  return result;
};

const deleteStudentFromDB = async (studentId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteStudent = await students.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deleteStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete student ');
    }

    const deleteUser = await Users.findOneAndUpdate(
      { id: studentId },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      }
    );
    if (!deleteUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete student');
  }
};

export const studentServices = {
  getaAllStudentDB,
  deleteStudentFromDB,
  singleStudentFromDB,
  updateSingleStudentFromDB,
};
