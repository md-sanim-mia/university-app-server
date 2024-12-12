import { Types } from 'mongoose';

export type TpreRequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourse?: [TpreRequisiteCourse];
  isDeleted?: boolean;
};

export type TCourseFaculty = {
  course: Types.ObjectId;
  courseFacultys: [Types.ObjectId];
};
