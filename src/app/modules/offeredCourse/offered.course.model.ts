import { model, Schema } from 'mongoose';
import { TOfferedCourse } from './offered.course.interface';
import { Days } from './offered.course.constan';

const offeredCourseSchema = new Schema<TOfferedCourse>({
  semesterRegistration: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'emster-register',
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'academicDepartment',
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'academicFaculty',
  },
  academicSemester: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'academic-semester',
  },
  course: { type: Schema.Types.ObjectId, required: true, ref: 'CourseFaculty' },
  faculty: { type: Schema.Types.ObjectId, required: true, ref: 'Faculty' },
  days: [{ type: String, enum: Days, required: true }],
  maxCapacity: { type: Number, required: true },
  section: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

export const OfferedCourse = model<TOfferedCourse>(
  'offeredCourse',
  offeredCourseSchema
);
