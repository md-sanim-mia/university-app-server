import { z } from 'zod';

const usersValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'password must be string ',
    })
    .max(20, { message: 'password can not be more than 20 characters' }),
  email: z.string({
    invalid_type_error: 'email is requrie ',
  }),
});

const chengeStaustValidationSchema = z.object({
  body: z.object({
    status: z.enum(['in-progress', 'blocked'], {
      required_error: 'sataus is requrie',
    }),
  }),
});

export const usersValidation = {
  usersValidationSchema,
  chengeStaustValidationSchema,
};
