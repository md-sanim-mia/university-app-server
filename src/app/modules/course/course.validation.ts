import { z } from 'zod';
const preRequisiteCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false).optional(),
});
const courseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').trim(),
    prefix: z.string().min(1, 'Prefix is required').trim(),
    code: z.number().int().min(1, 'Code is required'),
    credits: z.number().min(1, 'Credits are required'),
    preRequisiteCourse: z.array(preRequisiteCourseSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const updatepreRequisiteCourseSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().default(false).optional(),
});
const updatecourseValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').trim().optional(),
    prefix: z.string().min(1, 'Prefix is required').trim().optional(),
    code: z.number().int().min(1, 'Code is required').optional(),
    credits: z.number().min(1, 'Credits are required').optional(),
    preRequisiteCourse: z.array(updatepreRequisiteCourseSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});
const addCourseFacultyValidationSchema = z.object({
  body: z.object({
    courseFacultys: z.array(z.string()),
  }),
});
export const courseValidation = {
  courseValidationSchema,
  updatecourseValidationSchema,
  addCourseFacultyValidationSchema,
};
