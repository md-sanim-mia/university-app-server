import express from 'express';
import { studentPostCreate } from './studentContllor';
import { validateRequest } from '../../middlwares/validationRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

router.get('/get-student', studentPostCreate.getAllStudnetForDb);
router.get('/:studentId', studentPostCreate.deletStudent);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentSchemaValidation),
  studentPostCreate.deletStudent
);
router.delete('/:studentId', studentPostCreate.deletStudent);

export const studentRouter = router;
