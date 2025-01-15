import { model, Schema } from 'mongoose';
import { TAdmin } from './admin.interface';
import { BloodGroups, Gender } from './admin.constan';

const facultySchema = new Schema<TAdmin>({
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
  isDeleted: { type: Boolean, default: false, required: false },
});

export const Admin = model<TAdmin>('admin-stors', facultySchema);
