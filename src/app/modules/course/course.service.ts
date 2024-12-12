import mongoose from 'mongoose';
import queryBulders from '../../builders/queryBuilders';
import { courseSearchbleFields } from './course.constan';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createCourseForDb = async (playood: TCourse) => {
  const result = await Course.create(playood);
  return result;
};
const getAllCourseForDb = async (query: Record<string, unknown>) => {
  const courseQuery = new queryBulders(
    Course.find().populate('preRequisiteCourse.course'),
    query
  )
    .serarch(courseSearchbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  const result1 = await Course.find({});
  return result1;
};

const getSingleCourseForDb = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourse.course'
  );
  return result;
};
const updateSingleCourseForDb = async (
  id: string,
  playood: Partial<TCourse>
) => {
  const { preRequisiteCourse, ...reminigCourseData } = playood;

  // update basic course--------
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateBasicCourse = await Course.findByIdAndUpdate(
      id,
      reminigCourseData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!updateBasicCourse) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'failed to update basic course'
      );
    }

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      const deletePreRequisites = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);
      const deletePreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletePreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      if (!deletePreRequisiteCourses) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          'failed to remove pre requisite course'
        );
      }
      // ---- add new pre requistes----

      const newPreRequisites = preRequisiteCourse.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequisitescourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!newPreRequisitescourse) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          'failed to add pre requisite course'
        );
      }

      const result = await Course.findById(id).populate(
        'preRequisiteCourse.course'
      );
      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const deleteSingleCourseForDb = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};
const assingFacultiesWithCourseForDb = async (
  id: string,
  playood: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { courseFacultys: { $each: playood } },
    },
    {
      upsert: true,
      new: true,
    }
  );

  return result;
};
const removeFacultiesWithCourseForDb = async (
  id: string,
  playood: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { courseFacultys: { $in: playood } },
    },
    {
      new: true,
    }
  );

  return result;
};

export const courseService = {
  createCourseForDb,
  getAllCourseForDb,
  getSingleCourseForDb,
  deleteSingleCourseForDb,
  updateSingleCourseForDb,
  assingFacultiesWithCourseForDb,
  removeFacultiesWithCourseForDb,
};
