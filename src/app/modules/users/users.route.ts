import express from 'express';
import { usersContllors } from './users.contllor';

import { studentValidations } from '../student/student.validation';
import { validateRequest } from '../../middlwares/validationRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentSchemaValidation),
  usersContllors.createStudent
);

export const userRouters = router;
