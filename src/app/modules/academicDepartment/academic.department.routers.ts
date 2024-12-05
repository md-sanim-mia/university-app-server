import express from 'express';
import { validateRequest } from '../../middlwares/validationRequest';
import { academicDepartmentValidation } from './academic.department.validation';
import { academicDepartmentContllors } from './academic.department.contllors';
const router = express.Router();
router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidation.academicDepartmentValidationSchema
  ),
  academicDepartmentContllors.createAcademicDepartment
);
router.get(
  '/get-academic-department',
  academicDepartmentContllors.getAllAcademicDepartment
);
router.get(
  '/:departmentId',
  academicDepartmentContllors.getSingleAcademicDepartment
);
router.patch(
  '/:departmentId',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  academicDepartmentContllors.updateSingleAcademicDepartment
);
export const academicDepartmentRouter = router;
