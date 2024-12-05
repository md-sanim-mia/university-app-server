import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'academic department must be string',
      required_error: 'academic department is required',
    }),
    academicFaculty: z.string({
      required_error: 'academic department is required',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'academic department must be string',
        required_error: 'academic department is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'academic department is required',
      })
      .optional(),
  }),
});

export const academicDepartmentValidation = {
  academicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
