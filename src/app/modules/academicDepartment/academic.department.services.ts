import { TAcademicDepartment } from './academic.department.interface';
import { AcademicDepartment } from './academic.department.model';

const createAcademicDepartmentForDb = async (playood: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(playood);
  return result;
};

const getAllAcademicDepartmentForDb = async () => {
  const result = await AcademicDepartment.find({}).populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentForDb = async (departmentId: string) => {
  const result = await AcademicDepartment.findOne({
    _id: departmentId,
  }).populate('academicFaculty');
  return result;
};

const updeateSingleAcademicDepartmentForDb = async (
  departmentId: string,
  playood: Partial<TAcademicDepartment>
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: departmentId },
    playood,
    { new: true }
  );
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentForDb,
  getAllAcademicDepartmentForDb,
  getSingleAcademicDepartmentForDb,
  updeateSingleAcademicDepartmentForDb,
};
