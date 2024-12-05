import express from 'express';
import { validateRequest } from '../../middlwares/validationRequest';
import { academicFacultyValidation } from './academic.faculty.validation';
import { academicFacultyContllors } from './academic.faculty.contllor';
const router = express.Router();
router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyContllors.createAcademicFaculty
);
router.get(
  '/get-academic-faculty',
  academicFacultyContllors.getAllAcademicFaculty
);
router.get('/:facultyId', academicFacultyContllors.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  academicFacultyContllors.updateSingleAcademicFaculty
);
export const academicFacultyRouter = router;
