import express from 'express';
import { academicSemesterValidation } from './academic.semester.validation';
import { academicSemesterContllors } from './academic.semester.contllor';
import { validateRequest } from '../../middlwares/validationRequest';
import auth from '../../middlwares/auth';
const router = express.Router();

router.post(
  '/create-academic-semester',
  auth('admin'),
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidatonSchema
  ),
  academicSemesterContllors.createAcademicSemester
);

router.get(
  '/get-academic-semester',
  auth('admin'),
  academicSemesterContllors.getAllAcademicSemester
);

router.get('/:semesterId', academicSemesterContllors.getSingleAcademicSemester);
router.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidatonSchema
  ),
  academicSemesterContllors.updateSingleAcademicSemester
);
export const academicSemesterRouter = router;
