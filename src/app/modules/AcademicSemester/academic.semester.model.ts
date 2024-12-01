import { model, Schema } from 'mongoose';
import { TAcademicSemester, TMonth } from './academic.semester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academic.semester.const';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: AcademicSemesterName, required: true },
    code: { type: String, enum: AcademicSemesterCode, required: true },
    year: { type: String, required: true },
    startMonth: { type: String, enum: Months },
    endMonth: { type: String, enum: Months },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new Error('semester is already exists !');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'academic-semester',
  academicSemesterSchema
);
