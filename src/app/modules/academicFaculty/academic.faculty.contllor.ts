import { asyncCatch } from '../../utility/async.catch';
import { academicFacultyServices } from './academic.faculty.services';

const createAcademicFaculty = asyncCatch(async (req, res) => {
  const facultyData = req.body;
  const result = await academicFacultyServices.createAcademicFacultyForDb(
    facultyData
  );
  res.status(200).json({
    success: true,
    message: 'success fully academic faculty created',
    data: result,
  });
});

const getAllAcademicFaculty = asyncCatch(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyForDb();
  res.status(200).json({
    success: true,
    message: 'get all academic faculty data',
    data: result,
  });
});

const getSingleAcademicFaculty = asyncCatch(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.getSingleAcademicFacultyForDb(
    facultyId
  );
  res.status(200).json({
    success: true,
    message: 'get single academic faculty data',
    data: result,
  });
});

const updateSingleAcademicFaculty = asyncCatch(async (req, res) => {
  const { facultyId } = req.params;
  const facultyUpdateData = req.body;
  const result = await academicFacultyServices.updateSingleAcademicFacultyForDb(
    facultyId,
    facultyUpdateData
  );
  res.status(200).json({
    success: true,
    message: 'update single academic faculty data',
    data: result,
  });
});

export const academicFacultyContllors = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
