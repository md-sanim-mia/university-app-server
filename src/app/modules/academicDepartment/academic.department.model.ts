import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academic.department.interface';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'academicFaculty' },
  },
  { timestamps: true }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'this department is alredy exist'
    );
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const qurey = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne(qurey);
  if (!isDepartmentExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this department dose not exist');
  }
  next();
});
export const AcademicDepartment = model<TAcademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema
);
