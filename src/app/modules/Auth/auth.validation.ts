import { z } from 'zod';

const authLogingUserValidationSchema = z.object({
  body: z.object({
    id: z.string({ invalid_type_error: 'id is  required' }),
    password: z.string({ invalid_type_error: 'password is  required' }),
  }),
});
const chengePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ invalid_type_error: 'old password is  required' }),
    newPassword: z.string({ invalid_type_error: 'new  password is  required' }),
  }),
});
const refreshTokenValidationSchema = z.object({
  body: z.object({
    refreshToken: z.string({
      invalid_type_error: 'refresh token is  required',
    }),
  }),
});
const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      invalid_type_error: 'id is  required',
    }),
  }),
});
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      invalid_type_error: 'id is  required',
    }),
    newPassword: z.string({
      invalid_type_error: 'new password is  required',
    }),
  }),
});

export const authValidation = {
  authLogingUserValidationSchema,
  chengePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
