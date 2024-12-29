import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';
import { OfferedCourse } from '../offeredCourse/offered.course.model';
import { TEnrolledCourse } from './enrolle.course.interface';
import students from '../student/student.model';
import EnrolledCourse from './enrolle.course.model';
import { Course } from '../course/course.model';
import { SemesterRegistratio } from '../semesterRegistration/semester.registration.model';
import mongoose from 'mongoose';
import { Faculty } from '../faculty/faculty.model';

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
  const enrolledCourse = await EnrolledCourse.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExist.semesterRegistration,
        student: isStudentExist._id,
      },
    },
    {
      $lookup: {
        from: 'Courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolleCourseData',
      },
    },
    {
      $unwind: 'enrolleCourseData',
    },
    {
      $group: {
        _id: null,
        totalEnrolleCreadit: { $sum: '$enrolleCourseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        totalEnrolleCreadit: 1,
      },
    },
  ]);

  const totalCreadits =
    enrolledCourse.length > 0 ? enrolledCourse[0]?.totalEnrolleCreadit : 0;

  if (
    totalCreadits &&
    semesterRegistration?.maxCredit &&
    totalCreadits + course?.credits > semesterRegistration.maxCredit
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'you have exceeded maximum number of creadits!'
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await EnrolledCourse.create(
      [
        {
          semesterRegistration: isOfferedCourseExist.semesterRegistration,
          academicSemester: isOfferedCourseExist.academicSemester,
          academicFaculty: isOfferedCourseExist.academicFaculty,
          academicDepartment: isOfferedCourseExist.academicDepartment,
          offeredCourse: playood.offeredCourse,
          course: isOfferedCourseExist.course,
          student: isStudentExist._id,
          faculty: isOfferedCourseExist.faculty,
          isEnrolled: true,
        },
      ],
      { session }
    );

    if (!result) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to enroll in this cousre !'
      );
    }
    const maxCapacity = isOfferedCourseExist.maxCapacity;

    await OfferedCourse.findByIdAndUpdate(
      playood.offeredCourse,
      {
        maxCapacity: maxCapacity - 1,
      },
      { session }
    );
    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const isSemesterRegistrationExists = await SemesterRegistratio.findById(
    semesterRegistration
  );

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester registration not found !'
    );
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !');
  }
  const isStudentExists = await students.findById(student);

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 });

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden! !');
  }

  const modifyData: Record<string, unknown> = { ...courseMarks };
  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks;

    const totalMarks =
      Math.ceil(classTest1 * 0.1) +
      Math.ceil(midTerm * 0.3) +
      Math.ceil(classTest2 * 0.1) +
      Math.ceil(finalTerm * 0.5);

    const result = calculateGradePoints(totalMarks);

    modifyData.grade = result?.grade;
    modifyData.gradePoints = result?.gradePoints;
    modifyData.isCompleted = true;
  }
  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifyData[`courseMarks.${key}`] = value;
    }
  }

  const result = EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifyData,
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const EnrolledCourseSerivce = {
  createEnrolledCourseIntoDB,
  updateEnrolledCourseMarksIntoDB,
};
