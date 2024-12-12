import { z } from 'zod';
import { BloodGroups, Gender } from './faculty.constan';

// Zod validation schema
const facultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      name: z.object({
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string(),
      }),
      designation: z.string(),
      gender: z.enum([...Gender] as [string, ...string[]]),
      contactNumber: z.string(),
      emergencyContactNumber: z.string(),
      email: z.string(),
      bloodGroup: z.enum([...BloodGroups] as [string, ...string[]]),
      birth: z.string(),
      address: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string(),
      isDeleted: z.boolean().default(false).optional(),
      academicDepartment: z.string(),
    }),
  }),
});
const updateFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().min(1, 'First name is required').optional(),
        middleName: z.string().optional(),
        lastName: z.string().min(1, 'Last name is required').optional(),
      })
      .optional(),
    user: z.string().min(1, 'User ID is required').optional(), // Assuming this is a string (ObjectId as string)
    designation: z.string().min(1, 'Designation is required').optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    contactNumber: z.string().min(1, 'Contact number is required').optional(),
    emergencyContactNumber: z
      .string()
      .min(1, 'Emergency contact number is required')
      .optional(),
    email: z
      .string()
      .email('Invalid email address')
      .min(1, 'Email is required')
      .optional(),
    bloodGroup: z.enum([...BloodGroups] as [string, ...string[]]).optional(),
    birth: z.string().min(1, 'Date of birth is required').optional(), // Assuming this is a string, could be Date
    address: z.string().min(1, 'Address is required').optional(),
    permanentAddress: z
      .string()
      .min(1, 'Permanent address is required')
      .optional(),
    profileImage: z.string().min(1, 'Profile image URL is required').optional(),
    academicDepartment: z
      .string()
      .min(1, 'Academic Department ID is required')
      .optional(), // Assuming ObjectId as string
  }),
});

export const facultyValidation = {
  facultyValidationSchema,
  updateFacultyValidationSchema,
};
