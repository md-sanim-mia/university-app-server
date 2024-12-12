import mongoose, { model, Schema } from 'mongoose';
import { TFaculty } from './faculty.interface';
import { BloodGroups, Gender } from './faculty.constan';

const facultySchema = new Schema<TFaculty>({
  name: {
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
  },
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  designation: { type: String, required: true },
  gender: {
    type: String,
    enum: Gender,
    required: true,
  },
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bloodGroup: {
    type: String,
    enum: BloodGroups,
    required: true,
  },
  birth: { type: String, required: true }, // Could be Date type, but you're using string for now
  address: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImage: { type: String, required: true },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'academicDepartment',
    required: true,
  },
  isDeleted: { type: Boolean, default: false, required: false },
});

export const Faculty = model<TFaculty>('Faculty', facultySchema);
