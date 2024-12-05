import { z } from 'zod';
const createStudentSchemaValidation = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: z.object({
        firstName: z.string().trim().min(1), // Trim and required
        middleName: z.string().trim().optional(),
        lastName: z.string().min(1), // Required
      }),
      gender: z.enum(['male', 'female']),
      contactNumber: z.string().min(1), // Required
      emergencyContactNumber: z.string().min(1), // Required
      email: z.string().email(), // Valid email
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      birth: z.string().min(1), // Required
      address: z.string().min(1), // Required
      permanentAddress: z.string().min(1), // Required

      guardian: z.object({
        fatherName: z.string().min(1), // Required
        motherName: z.string().min(1), // Required
        fatherContactNumber: z.string().min(1), // Required
        motherContactNumber: z.string().min(1), // Required
        fatherEmail: z.string().email(), // Valid email
        motherEmail: z.string().email(), // Valid email
      }),

      profileImage: z.string().min(1), // Required
      admissionSemester: z.string(),
      localGuardian: z
        .object({
          name: z.string().min(1), // Required
          relation: z.string().min(1), // Required
          contactNumber: z.string().min(1), // Required
          email: z.string().email(), // Valid email
        })
        .optional(), // Optional
    }),
  }),
});
const updateStudentSchemaValidation = z.object({
  body: z.object({
    student: z
      .object({
        name: z
          .object({
            firstName: z.string().trim().min(1).optional(), // Optional
            middleName: z.string().trim().optional(), // Optional
            lastName: z.string().min(1).optional(), // Optional
          })
          .optional(), // Optional
        gender: z.enum(['male', 'female']).optional(), // Optional
        contactNumber: z.string().min(1).optional(), // Optional
        emergencyContactNumber: z.string().min(1).optional(), // Optional
        email: z.string().email().optional(), // Optional
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(), // Optional
        birth: z.string().min(1).optional(), // Optional
        address: z.string().min(1).optional(), // Optional
        permanentAddress: z.string().min(1).optional(), // Optional
        guardian: z
          .object({
            fatherName: z.string().min(1).optional(), // Optional
            motherName: z.string().min(1).optional(), // Optional
            fatherContactNumber: z.string().min(1).optional(), // Optional
            motherContactNumber: z.string().min(1).optional(), // Optional
            fatherEmail: z.string().email().optional(), // Optional
            motherEmail: z.string().email().optional(), // Optional
          })
          .optional(), // Optional
        profileImage: z.string().min(1).optional(), // Optional
        admissionSemester: z.string().optional(), // Optional
        localGuardian: z
          .object({
            name: z.string().min(1).optional(), // Optional
            relation: z.string().min(1).optional(), // Optional
            contactNumber: z.string().min(1).optional(), // Optional
            email: z.string().email().optional(), // Optional
          })
          .optional(), // Optional
      })
      .optional(), // Optional
  }),
});

export const studentValidations = {
  createStudentSchemaValidation,
  updateStudentSchemaValidation,
};
