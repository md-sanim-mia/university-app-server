import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from './academic.semester.interface';
import { AcademicSemester } from './academic.semester.model';

const createAcademicSemesterForDb = async (semester: TAcademicSemester) => {
  const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autum: '01',
    Summar: '02',
    Fall: '03',
  };

  if (academicSemesterNameCodeMapper[semester.name] !== semester.code) {
    throw new Error('Invalid semester code ');
  }
  const result = await AcademicSemester.create(semester);

  return result;
};

const getAllAcademicSemesterForDb = async () => {
  const result = await AcademicSemester.find({});
  console.log(result);
  return result;
};

const getSingleAcademicSemesterForDb = async (semesterId: string) => {
  const result = await AcademicSemester.findOne({ _id: semesterId });
  return result;
};

const updateSingleAcademicSemesterForDb = async (
  semesterId: string,
  semesterUpdateData: TAcademicSemester
) => {
  const result = await AcademicSemester.updateOne(
    { _id: semesterId },
    {
      $set: {
        name: semesterUpdateData.name,
        year: semesterUpdateData.year,
        code: semesterUpdateData.code,
        startMonth: semesterUpdateData.startMonth,
        endMonth: semesterUpdateData.endMonth,
      },
    }
  );
  return result;
};
export const academicSemesterService = {
  createAcademicSemesterForDb,
  getAllAcademicSemesterForDb,
  getSingleAcademicSemesterForDb,
  updateSingleAcademicSemesterForDb,
};
