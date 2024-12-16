import { z } from 'zod';
import { Days } from './offered.course.constan';
const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5] [0-9]$/;
    return regex.test(time);
  },
  {
    message:
      'Invalid time format! Please provide this format HH:MM in 24 hours format ',
  }
);
const offeredCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      academicSemester: z.string(),
      course: z.string(),
      faculty: z.string(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      maxCapacity: z.number(),
      section: z.number(),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'start time should be before end time ',
      }
    ),
});
const updateOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      days: z.enum([...Days] as [string, ...string[]]),
      maxCapacity: z.number().optional(),
      faculty: z.string(),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: 'start time should be before end time ',
      }
    ),
});

export const offeredCourseValidation = {
  offeredCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
