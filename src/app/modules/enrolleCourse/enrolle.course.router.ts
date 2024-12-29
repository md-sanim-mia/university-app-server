import express from 'express';
import { validateRequest } from '../../middlwares/validationRequest';
import { EnrolledCourseValidations } from './enrolle.course.validation';
import { enrolledCourseContllors } from './enrolle.course.contllor';
import auth from '../../middlwares/auth';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema
  ),
  enrolledCourseContllors.createEnrolledCourse
);
router.patch(
  '/update-enrolled-course-marks',
  auth('faculty'),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema
  ),
  enrolledCourseContllors.updateEnrolledCourseMarks
);

export const enrolledCourseRouter = router;
