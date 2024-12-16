import express from 'express';
import { semesterRegistrationContllors } from './semester.registration.contllor';
import { validateRequest } from '../../middlwares/validationRequest';
import { semesterRegistrationValidatin } from './semester.registration.validation';
const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidatin.semesterRegistrationValidationSchema
  ),
  semesterRegistrationContllors.createSemisterRegistration
);
router.get('/', semesterRegistrationContllors.getAllSemisterRegistration);
router.get('/:id', semesterRegistrationContllors.getSingleSemisterRegistration);
router.delete(
  '/:id',
  semesterRegistrationContllors.deletedSingleSemisterRegistration
);
router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidatin.updateSemesterRegistrationValidationSchema
  ),
  semesterRegistrationContllors.updateSingleSemisterRegistration
);

export const semesterRegistrationRouter = router;
