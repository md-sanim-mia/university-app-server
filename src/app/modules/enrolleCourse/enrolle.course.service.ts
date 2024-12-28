import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offered.course.model';
import { TEnrolledCourse } from './enrolle.course.interface';
import students from '../student/student.model';
import EnrolledCourse from './enrolle.course.model';
import { Course } from '../course/course.model';
import { SemesterRegistratio } from '../semesterRegistration/semester.registration.model';

const createEnrolledCourseIntoDB = async (
  userId: string,
  playood: TEnrolledCourse
) => {
  const isOfferedCourseExist = await OfferedCourse.findById(
    playood?.offeredCourse
  );

  if (!isOfferedCourseExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'offered course is not found');
  }
  if (isOfferedCourseExist.maxCapacity <= 0) {
    throw new AppError(StatusCodes.BAD_GATEWAY, 'room is full');
  }

  const isStudentExist = await students.findOne({ id: playood.student });
  if (!isStudentExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'student is not found');
  }
  const isStudentAlreadyExist = await EnrolledCourse.findOne({
    id: playood.student,
    semesterRegistration: isOfferedCourseExist.semesterRegistration,
    offeredCourse: playood.offeredCourse,
  });
  if (!isStudentAlreadyExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Student is already enrolled !'
    );
  }

  const course = await Course.findById(isOfferedCourseExist.course);
  const currentCredit = course?.credits;

  const semesterRegistration = await SemesterRegistratio.findById(
    isOfferedCourseExist.semesterRegistration
  ).select('maxCredit');
};

export const EnrolledCourseSerivce = {
  createEnrolledCourseIntoDB,
};
