import { model, Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TpreRequisiteCourse,
} from './course.interface';

const preRequisiteCourse = new Schema<TpreRequisiteCourse>({
  course: { type: Schema.Types.ObjectId, ref: 'Courses' },
  isDeleted: { type: Boolean, default: false },
});
const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    prefix: { type: String, required: true, trim: true },
    code: { type: Number, required: true, trim: true },
    credits: { type: Number, required: true, trim: true },
    preRequisiteCourse: [preRequisiteCourse],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Course = model<TCourse>('Courses', courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref: 'Courses',
  },
  courseFacultys: {
    type: [Schema.Types.ObjectId],
    ref: 'Faculty',
    required: true,
  },
});

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema
);
