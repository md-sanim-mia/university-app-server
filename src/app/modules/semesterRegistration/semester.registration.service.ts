import { StatusCodes } from 'http-status-codes';
import { TSemesterRegistration } from './semester.registration.interface';
import { SemesterRegistratio } from './semester.registration.model';
import { AppError } from '../../errors/AppError';
import { AcademicSemester } from '../AcademicSemester/academic.semester.model';
import queryBulders from '../../builders/queryBuilders';
import mongoose from 'mongoose';
import { OfferedCourse } from '../offeredCourse/offered.course.model';

const createSemesterRegistrationForDb = async (
  playood: TSemesterRegistration
) => {
  const academicSemester = playood?.academicSemester;

  //check if there any semester registration that is alredy "UPCOMING"/"ONGOING"
  const isThereAnyUpcomingOrOngingsemesterCheck =
    await SemesterRegistratio.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
  if (isThereAnyUpcomingOrOngingsemesterCheck) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `register semester already ${isThereAnyUpcomingOrOngingsemesterCheck.status}`
    );
  }
  // chek academic semester foun ar not not found -------------
  const isAcademicSemester = await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemester) {
    throw new AppError(StatusCodes.NOT_FOUND, 'academic semester is not found');
  }
  // chek registration semester alreay exist ----------
  const isSemesterExist = await SemesterRegistratio.findOne({
    academicSemester: academicSemester,
  });

  if (isSemesterExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this semester already exist');
  }
  //fintly create create registeration semester-----------
  const result = await SemesterRegistratio.create(playood);
  return result;
};
const getSemesterRegistrationForDb = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuerys = new queryBulders(
    SemesterRegistratio.find({}).populate('academicSemester'),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuerys.modelQuery;
  return result;
};
const getSingleSemisterRegistrationForDb = async (id: string) => {
  const result = await SemesterRegistratio.findById(id).populate(
    'academicSemester'
  );
  return result;
};
const updateSemisterRegistrationForDb = async (
  id: string,
  playood: Partial<TSemesterRegistration>
) => {
  const isRegisterSemester = await SemesterRegistratio.findById(id);
  if (!isRegisterSemester) {
    throw new AppError(StatusCodes.BAD_REQUEST, `this semester is not foun`);
  }
  const currentSemesterStatus = isRegisterSemester.status;
  const requestStatus = playood.status;
  if (currentSemesterStatus === 'ENDED') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      `this semester is alreday ${currentSemesterStatus}`
    );
  }

  if (currentSemesterStatus === 'UPCOMING' && requestStatus === 'ENDED') {
    `you can not directly chenge status form ${currentSemesterStatus} to ${requestStatus}`;
  }
  if (currentSemesterStatus === 'ONGOING' && requestStatus === 'ENDED') {
    `you can not directly chenge status form ${currentSemesterStatus} to ${requestStatus}`;
  }
  const result = await SemesterRegistratio.findByIdAndUpdate(id, playood, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSemisterRegistrationForDb = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const isSemesterRegistrationExist = await SemesterRegistratio.findById(id);

    if (!isSemesterRegistrationExist) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        'semester registration is not foun'
      );
    }

    const isOfferedCourseExist = await OfferedCourse.findOne({
      semesterRegistration: id,
    });

    if (!isOfferedCourseExist) {
      throw new AppError(StatusCodes.NOT_FOUND, 'offered course  is not foun');
    }

    if (isSemesterRegistrationExist.status !== 'UPCOMING') {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        `semester must be upcoming need for deleted `
      );
    }

    const isOfferedCourseDeleted = await OfferedCourse.findByIdAndDelete(
      isOfferedCourseExist?._id,
      {
        session,
      }
    );

    if (!isOfferedCourseDeleted) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        ' filed to deleted for the  course'
      );
    }

    const isDeletedSemesterRegistration =
      await SemesterRegistratio.findByIdAndDelete(id, {
        session,
      });

    if (!isDeletedSemesterRegistration) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        ' filed to deleted for the  semester registration'
      );
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const semesterRegistrationSerice = {
  createSemesterRegistrationForDb,
  getSemesterRegistrationForDb,
  getSingleSemisterRegistrationForDb,
  updateSemisterRegistrationForDb,
  deleteSemisterRegistrationForDb,
};
