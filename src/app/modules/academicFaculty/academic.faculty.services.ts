import { TAcademicFaculty } from './academic.faculty.interface';
import { AcademicFaculty } from './academic.faculty.model';

const createAcademicFacultyForDb = async (playood: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(playood);
  return result;
};

const getAllAcademicFacultyForDb = async () => {
  const result = await AcademicFaculty.find({});
  return result;
};

const getSingleAcademicFacultyForDb = async (facultyId: string) => {
  const result = await AcademicFaculty.findOne({ _id: facultyId });
  return result;
};

const updateSingleAcademicFacultyForDb = async (
  facultyId: string,
  facultyUpdateData: Partial<TAcademicFaculty>
) => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: facultyId },
    facultyUpdateData,
    { new: true }
  );
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyForDb,
  getAllAcademicFacultyForDb,
  getSingleAcademicFacultyForDb,
  updateSingleAcademicFacultyForDb,
};
