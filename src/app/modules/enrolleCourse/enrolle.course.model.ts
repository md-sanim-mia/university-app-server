import { model, Schema } from 'mongoose';
import {
  TEnrolledCourse,
  TEnrolledCourseMarks,
} from './enrolle.course.interface';
import { Grade } from './enrolle.course.constn';

const courseMarksSchema = new Schema<TEnrolledCourseMarks>(
  {
    classTest1: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    midTerm: {
      type: Number,
      min: 0,
      max: 30,
      default: 0,
    },
    classTest2: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    finalTerm: {
      type: Number,
      min: 0,
      max: 50,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const enrolledCourseSchema = new Schema<TEnrolledCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    ref: 'semster-register',
    required: true,
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: 'academic-semester',
    required: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'academicFaculty',
    required: true,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academicDepartment',
    required: true,
  },
  offeredCourse: {
    type: Schema.Types.ObjectId,
    ref: 'offeredCourse',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Courses',
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Students',
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  courseMarks: {
    type: courseMarksSchema,
    default: {},
  },
  grade: {
    type: String,
    enum: Grade,
    default: 'N/A',
  },
  gradePoints: {
    type: Number,
    min: 0,
    max: 4,
    default: 0,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const EnrolledCourse = model<TEnrolledCourse>(
  'EnrolledCourse',
  enrolledCourseSchema
);

export default EnrolledCourse;
