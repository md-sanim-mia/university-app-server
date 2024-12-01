import { asyncCatch } from '../../utility/async.catch';
import { academicSemesterService } from './academi.semester.service';

const createAcademicSemester = asyncCatch(async (req, res) => {
  const semester = req.body;
  const result = await academicSemesterService.createAcademicSemesterForDb(
    semester
  );
  res.status(200).json({
    success: true,
    message: 'academic semester success fully create done',
    data: result,
  });
});

const getAllAcademicSemester = asyncCatch(async (req, res) => {
  const result1 = await academicSemesterService.getAllAcademicSemesterForDb();
  res
    .status(200)
    .json({ success: true, message: 'get all semester data', data: result1 });
});

const getSingleAcademicSemester = asyncCatch(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterService.getSingleAcademicSemesterForDb(
    semesterId
  );
  res.status(200).json({
    success: true,
    message: 'find single semester data',
    data: result,
  });
});

const updateSingleAcademicSemester = asyncCatch(async (req, res) => {
  const { semesterId } = req.params;
  const semesterUpdateData = req.body;
  const result =
    await academicSemesterService.updateSingleAcademicSemesterForDb(
      semesterId,
      semesterUpdateData
    );

  res.status(200).json({
    success: true,
    message: 'update single semester data',
    data: result,
  });
});

export const academicSemesterContllors = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
