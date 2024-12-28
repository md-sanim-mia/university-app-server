import confing from '../../confing';
import { asyncCatch } from '../../utility/async.catch';
import { authService } from './auth.service';

const authLogingUser = asyncCatch(async (req, res) => {
  const playood = req.body;
  const result = await authService.authLogingUserForDb(playood);
  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: confing.node_env === 'production',
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: 'user success fully logiend',
    data: { accessToken, needsPasswordChange },
  });
});
const chengePassword = asyncCatch(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await authService.chengePasswordForDb(req?.user, passwordData);

  res.status(200).json({
    success: true,
    message: 'upassword success fully updated',
    data: result,
  });
});
const refreshToken = asyncCatch(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshTokenDb(refreshToken);

  res.status(200).json({
    success: true,
    message: 'access token refresh success fully',
    data: result,
  });
});
const forgetPassword = asyncCatch(async (req, res) => {
  const id = req.body.id;
  const result = await authService.forgetPasswordForDb(id);

  res.status(200).json({
    success: true,
    message: 'forget password link is success fully generated',
  });
});
const resetPassword = asyncCatch(async (req, res) => {
  const playood = req.body;
  const token = req.headers.authorization?.split(' ')[1] as string;
  const result = await authService.resetPasswordForDb(playood, token);

  res.status(200).json({
    success: true,
    message: 'success fully reset your password',
  });
});

export const authContllors = {
  authLogingUser,
  chengePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
