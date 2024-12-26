import express from 'express';
import { usersContllors } from './users.contllor';
import { studentValidations } from '../student/student.validation';
import { validateRequest } from '../../middlwares/validationRequest';
import { facultyValidation } from '../faculty/faculty.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../Auth/auth.constan';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentSchemaValidation),
  usersContllors.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(facultyValidation.facultyValidationSchema),
  usersContllors.createFaculty
);

export const userRouters = router;
