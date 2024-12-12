import mongoose from 'mongoose';
import queryBulders from '../../builders/queryBuilders';
import { adminSearchbleFields } from './admin.constan';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import Users from '../users/users.model';

const getAllAdminForDb = async (query: Record<string, unknown>) => {
  const queryAdmin = new queryBulders(Admin.find(), query)
    .serarch(adminSearchbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await queryAdmin.modelQuery;
  return result;
};
const getSingleAdminForDb = async (id: string) => {
  const result = await Admin.findById(id).populate('academicDepartment');
  return result;
};

const updateSingleAdminForDb = async (id: string, playood: Partial<TAdmin>) => {
  const { name, ...remeningAdminData } = playood;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remeningAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleAdminForDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deleteAdmin = await Admin.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true, session }
    );
    if (!deleteAdmin) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to deleted admin for db'
      );
    }
    const userId = deleteAdmin.user;

    const deleteUser = await Users.findByIdAndUpdate(
      userId,
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      }
    );

    if (!deleteUser) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to deleted user for db'
      );
    }

    await session.commitTransaction();
    await session.endSession();
    return deleteAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const adminService = {
  getAllAdminForDb,
  getSingleAdminForDb,
  updateSingleAdminForDb,
  deleteSingleAdminForDb,
};
