import express from 'express';
import { validateRequest } from '../../middlwares/validationRequest';
import { EnrolledCourseValidations } from './enrolle.course.validation';
import { enrolledCourseContllors } from './enrolle.course.contllor';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema
  ),
  enrolledCourseContllors.createEnrolledCourse
);

export const enrolledCourseRouter = router;
