import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academic.faculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>({
  name: { type: String, required: true, unique: true },
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema
);
