import Joi from 'joi';
import { z } from 'zod';

// const studentSchemas = Joi.object({
//   name: Joi.object({
//     firstName: Joi.string().trim().required(),
//     middleName: Joi.string().trim().allow(''),
//     lastName: Joi.string().required(),
//   }).required(),
//   gender: Joi.string().valid('male', 'female').required(),
//   id: Joi.string().required(),
//   contactNumber: Joi.string().required(),
//   emergencyContactNumber: Joi.string().required(),
//   email: Joi.string().email().required(),
//   bloodGroup: Joi.string()
//     .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
//     .required(),
//   birth: Joi.string().required(),
//   address: Joi.string().required(),
//   permanentAddress: Joi.string().required(),
//   guardian: Joi.object({
//     fatherName: Joi.string().required(),
//     motherName: Joi.string().required(),
//     fatherContactNumber: Joi.string().required(),
//     motherContactNumber: Joi.string().required(),
//     fatherEmail: Joi.string().email().required(),
//     motherEmail: Joi.string().email().required(),
//   }).required(),
//   profileImage: Joi.string().required(),
//   localGuardian: Joi.object({
//     name: Joi.string().required(),
//     relation: Joi.string().required(),
//     contactNumber: Joi.string().required(),
//     email: Joi.string().email().required(),
//   }).optional(),
//   isActive: Joi.string().valid('active', 'inActive').required(),
// });

export const studentSchema = z.object({
  name: z.object({
    firstName: z.string().trim().min(1), // Trim and required
    middleName: z.string().trim().optional(),
    lastName: z.string().min(1), // Required
  }),
  password: z.string().max(20),
  gender: z.enum(['male', 'female']),
  id: z.string().min(1), // Required
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
  localGuardian: z
    .object({
      name: z.string().min(1), // Required
      relation: z.string().min(1), // Required
      contactNumber: z.string().min(1), // Required
      email: z.string().email(), // Valid email
    })
    .optional(), // Optional
  isActive: z.enum(['active', 'inActive']),
  isDeleted: z.boolean(),
});
