import express, { NextFunction, Request, Response } from 'express';
import { usersContllors } from './users.contllor';
import { studentValidations } from '../student/student.validation';
import { validateRequest } from '../../middlwares/validationRequest';
import { facultyValidation } from '../faculty/faculty.validation';
import auth from '../../middlwares/auth';
import { USER_ROLE } from '../Auth/auth.constan';
import { usersValidation } from './users.validation';
import { upload } from '../Auth/auth.utils';
import { adminValidation } from '../admin/admin.validation';
const router = express.Router();

router.post(
  '/create-student',
  // auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  // validateRequest(studentValidations.createStudentSchemaValidation),
  usersContllors.createStudent
);

router.post(
  '/create-admin',
  // validateRequest(adminValidation.adminValidationSchema),
  usersContllors.createAdmin
);
router.post(
  '/create-faculty',
  validateRequest(facultyValidation.facultyValidationSchema),
  usersContllors.createFaculty
);
router.get('/me', auth('student', 'admin', 'faculty'), usersContllors.getMe);
router.patch(
  '/chenge-status/:id',
  validateRequest(usersValidation.chengeStaustValidationSchema),
  auth('admin'),
  usersContllors.chengeStaust
);
export const userRouters = router;
