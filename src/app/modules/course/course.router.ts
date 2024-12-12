import express from 'express';
import { courseContllor } from './course.contllor';
import { validateRequest } from '../../middlwares/validationRequest';
import { courseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidation.courseValidationSchema),
  courseContllor.createCourse
);
router.get('/get-course', courseContllor.getAllCourse);
router.get('/:id', courseContllor.getSingleCourse);
router.patch(
  '/:id',
  validateRequest(courseValidation.updatecourseValidationSchema),
  courseContllor.updateSingleCourse
);
router.delete('/:id', courseContllor.deleteSingleCourse);

router.put(
  '/:courseId/assign-faculty',
  validateRequest(courseValidation.addCourseFacultyValidationSchema),
  courseContllor.assingFacultiesWithCourse
);
router.delete(
  '/:courseId/remove-faculty',
  validateRequest(courseValidation.addCourseFacultyValidationSchema),
  courseContllor.removeFacultiesWithCourse
);
export const courseRouters = router;
