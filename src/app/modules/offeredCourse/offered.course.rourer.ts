import express from 'express';
import { validateRequest } from '../../middlwares/validationRequest';
import { offeredCourseValidation } from './offered.course.validatin';
import { offeredCourseContllors } from './offered.course.contlor';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidation.offeredCourseValidationSchema),
  offeredCourseContllors.createOfferedCourse
);

router.get('/get-offered-course', offeredCourseContllors.getAllOfferedCourse);
router.get('/:id', offeredCourseContllors.getSingleOfferedCourse);
router.delete('/:id', offeredCourseContllors.deleteSingleOfferedCourse);
router.patch(
  '/:id',
  validateRequest(offeredCourseValidation.updateOfferedCourseValidationSchema),
  offeredCourseContllors.updateSingleOfferedCourse
);

export const offeredCourseRouter = router;
