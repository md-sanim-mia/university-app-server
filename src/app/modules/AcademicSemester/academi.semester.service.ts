import { academicSemesterNameCodeMapper } from './academic.semester.const';
import {
  TAcademicSemester,
  TAcademicSemesterUpdate,
} from './academic.semester.interface';
import { AcademicSemester } from './academic.semester.model';

const createAcademicSemesterForDb = async (semester: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[semester.name] !== semester.code) {
    throw new Error('Invalid semester code ');
  }
  const result = await AcademicSemester.create(semester);

  return result;
};

const getAllAcademicSemesterForDb = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleAcademicSemesterForDb = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({ _id: semesterId });
  return result;
};

const updateSingleAcademicSemesterForDb = async (
  semesterId: string,
  semesterUpdateData: TAcademicSemesterUpdate
) => {
  if (
    semesterUpdateData.name &&
    semesterUpdateData.code &&
    academicSemesterNameCodeMapper[semesterUpdateData.name] !==
      semesterUpdateData.code
  ) {
    throw new Error('Invalid semester code ');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: semesterId },
    semesterUpdateData,
    { new: true }
  );
  return result;
};
export const academicSemesterService = {
  createAcademicSemesterForDb,
  getAllAcademicSemesterForDb,
  getSingleAcademicSemesterForDb,
  updateSingleAcademicSemesterForDb,
};
