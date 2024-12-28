import express from 'express';
import { validateRequest } from '../../middlwares/validationRequest';
import { authValidation } from './auth.validation';
import { authContllors } from './auth.contllor';
import auth from '../../middlwares/auth';
import { USER_ROLE } from './auth.constan';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.authLogingUserValidationSchema),
  authContllors.authLogingUser
);
router.post(
  '/chenge-password',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  validateRequest(authValidation.chengePasswordValidationSchema),
  authContllors.chengePassword
);
router.post(
  '/refresh-Token',
  validateRequest(authValidation.refreshTokenValidationSchema)
);
router.post(
  '/forget-password',
  validateRequest(authValidation.forgetPasswordValidationSchema),
  authContllors.forgetPassword
);
router.post(
  '/reset-password',
  validateRequest(authValidation.resetPasswordValidationSchema),
  authContllors.resetPassword
);

export const loginUserRouter = router;
