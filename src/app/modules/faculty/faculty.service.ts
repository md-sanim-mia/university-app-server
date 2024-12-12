import mongoose from 'mongoose';
import queryBulders from '../../builders/queryBuilders';
import { facultySearchbleFields } from './faculty.constan';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import Users from '../users/users.model';

const getAllFacultyForDb = async (query: Record<string, unknown>) => {
  const facultyQuery = new queryBulders(
    Faculty.find().populate('academicDepartment').select('-password'),
    query
  )
    .serarch(facultySearchbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyForDb = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment');
  return result;
};

const updateSingleFacultyForDB = async (
  id: string,
  playood: Partial<TFaculty>
) => {
  const { name, ...remeningFacultyData } = playood;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remeningFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletedSingleFacultyForDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );
    if (!deleteFaculty) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'filed to deleted faculty for db'
      );
    }
    const userId = deleteFaculty.user;
    const deleteUser = await Users.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );

    if (!deleteUser) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'filed to deleted user for db'
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const facultyService = {
  getAllFacultyForDb,
  getSingleFacultyForDb,
  updateSingleFacultyForDB,
  deletedSingleFacultyForDb,
};
