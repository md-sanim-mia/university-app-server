import express from 'express';
import { academicSemesterValidation } from './academic.semester.validation';
import { academicSemesterContllors } from './academic.semester.contllor';
import { validateRequest } from '../../middlwares/validationRequest';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidatonSchema
  ),
  academicSemesterContllors.createAcademicSemester
);

router.get(
  '/get-academic-semester',
  academicSemesterContllors.getAllAcademicSemester
);

router.get('/:semesterId', academicSemesterContllors.getSingleAcademicSemester);
router.patch(
  '/:semesterId',
  academicSemesterContllors.updateSingleAcademicSemester
);
export const academicSemesterRouter = router;
