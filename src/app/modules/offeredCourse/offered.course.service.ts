import { StatusCodes } from 'http-status-codes';
import queryBulders from '../../builders/queryBuilders';
import { AppError } from '../../errors/AppError';
import { SemesterRegistratio } from '../semesterRegistration/semester.registration.model';
import { TOfferedCourse } from './offered.course.interface';
import { OfferedCourse } from './offered.course.model';
import { AcademicSemester } from '../AcademicSemester/academic.semester.model';
import { AcademicFaculty } from '../academicFaculty/academic.faculty.model';
import { AcademicDepartment } from '../academicDepartment/academic.department.model';
import { Course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { hasTimeConflict } from './offered.course.utils';

const createOfferedCourseForDb = async (playood: TOfferedCourse) => {
  const {
    academicDepartment,
    academicFaculty,
    semesterRegistration,
    academicSemester,
    faculty,
    section,
    course,
    days,
    startTime,
    endTime,
  } = playood;

  const isRegisterSemesterExist = await SemesterRegistratio.findById(
    semesterRegistration
  );

  if (!isRegisterSemesterExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      ' register semester is not found'
    );
  }
  const isacademicFacultyExist = await AcademicFaculty.findById(
    academicFaculty
  );

  if (!isacademicFacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'academic faculty is not found');
  }
  const isacademicDepartmentExist = await AcademicDepartment.findById(
    academicDepartment
  );

  if (!isacademicDepartmentExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'academic  department is not found'
    );
  }

  const isCourseExist = await Course.findById(course);

  if (!isCourseExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'course is not found');
  }
  const isFacultyExist = await Faculty.findById(faculty);

  if (!isFacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND, ' faculty is not found');
  }

  // check if the department belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      ` this ${isacademicDepartmentExist.name} is not belong to this ${isacademicFacultyExist.name}`
    );
  }
  // check if the same offer course same section in same semester registrarion exist
  const isCheckExist = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });

  if (isCheckExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'offered course with same section already exist'
    );
  }

  //get the schedul of tge faculty

  const assignScheduls = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedul = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignScheduls, newSchedul)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'this faculty is not available that time ! chose other time or day '
    );
  }
  // create offered course -------------
  const result = await OfferedCourse.create(playood);
  return result;
};

const getAllOfferedCourseForDb = async (query: Record<string, unknown>) => {
  const OfferedCourseQuery = new queryBulders(
    OfferedCourse.find().populate('academicDepartment').select('-password'),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await OfferedCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseForDb = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateSingleOfferedCourseForDb = async (
  id: string,
  playood: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>
) => {
  const { faculty, days, startTime, endTime } = playood;

  const isOfferedCourseExist = await OfferedCourse.findById(id);

  if (!isOfferedCourseExist) {
    throw new AppError(StatusCodes.NOT_FOUND, ' offered course is not found');
  }
  const isfacultyExist = await Faculty.findById(faculty);

  if (!isfacultyExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'faculty is not found');
  }
  const semesterRegistration = isOfferedCourseExist.semesterRegistration;
  const semesterRegistrationStatus = await SemesterRegistratio.findById(
    semesterRegistration
  );

  if (semesterRegistrationStatus?.status! === 'UPCOMING') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'you can update onley upcoming semester'
    );
  }
  const assignScheduls = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedul = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignScheduls, newSchedul)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'this faculty is not available that time ! chose other time or day '
    );
  }
  // update content section----------
  const result = await OfferedCourse.findById(id, playood, {
    new: true,
  });
  return result;
};

const deletedOfferedCourseForDb = async (id: string) => {
  const isOfferedCourseExist = await OfferedCourse.findById(id);

  if (!isOfferedCourseExist) {
    throw new AppError(StatusCodes.NOT_FOUND, ' offered course is not found');
  }
  const semesterRegistration = isOfferedCourseExist.semesterRegistration;
  const semesterRegistrationStatus = await SemesterRegistratio.findById(
    semesterRegistration
  ).select('status');

  if (semesterRegistrationStatus?.status! === 'UPCOMING') {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'you can delete onley upcoming semester'
    );
  }

  const result = await OfferedCourse.findByIdAndDelete(id);
  return result;
};

export const offeredCourseService = {
  createOfferedCourseForDb,
  getAllOfferedCourseForDb,
  getSingleOfferedCourseForDb,
  updateSingleOfferedCourseForDb,
  deletedOfferedCourseForDb,
};
