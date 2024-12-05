import { asyncCatch } from '../../utility/async.catch';
import { academicDepartmentServices } from './academic.department.services';

const createAcademicDepartment = asyncCatch(async (req, res) => {
  const departmentData = req.body;
  const result = await academicDepartmentServices.createAcademicDepartmentForDb(
    departmentData
  );
  res.status(200).json({
    success: true,
    message: 'success fully academic department created',
    data: result,
  });
});

const getAllAcademicDepartment = asyncCatch(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentForDb();
  res.status(200).json({
    success: true,
    message: 'get all academic department data',
    data: result,
  });
});

const getSingleAcademicDepartment = asyncCatch(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentForDb(
      departmentId
    );
  res.status(200).json({
    success: true,
    message: 'get single academic faculty data',
    data: result,
  });
});

const updateSingleAcademicDepartment = asyncCatch(async (req, res) => {
  const { departmentId } = req.params;
  const departmentUpdateData = req.body;
  const result =
    await academicDepartmentServices.updeateSingleAcademicDepartmentForDb(
      departmentId,
      departmentUpdateData
    );
  res.status(200).json({
    success: true,
    message: 'update single academic faculty data',
    data: result,
  });
});

export const academicDepartmentContllors = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};
