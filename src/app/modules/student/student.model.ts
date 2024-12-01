import mongoose, { Schema, model, connect } from 'mongoose';
import { gurdingName, TStudent, userName } from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import confing from '../../confing';
const NewName = new Schema<userName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
  },
});

const newGuridn = new Schema<gurdingName>({
  fatherName: { type: String, required: [true, "Father's name is required."] },
  motherName: { type: String, required: [true, "Mother's name is required."] },
  fatherContactNumber: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherContactNumber: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
  fatherEmail: {
    type: String,
    required: [true, "Father's email is required."],
  },
  motherEmail: {
    type: String,
    required: [true, "Mother's email is required."],
  },
});

const newLocalGurdn = new Schema({
  name: { type: String, required: [true, 'Local guardian name is required.'] },
  relation: {
    type: String,
    required: [true, 'Relation with local guardian is required.'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Local guardian contact number is required.'],
  },
  email: {
    type: String,
    required: [true, 'Local guardian email is required.'],
  },
});

const studentSchema = new Schema<TStudent>(
  {
    name: { type: NewName, required: [true, 'Student name is required.'] },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required.'],
    },
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id is required'],
      unique: true,
      ref: 'Users',
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      match: [/.+\@.+\..+/, 'Please provide a valid email address.'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: [true, 'Blood group is required.'],
    },
    birth: { type: String, required: [true, 'Date of birth is required.'] },
    address: { type: String, required: [true, 'Current address is required.'] },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required.'],
    },
    guardian: {
      type: newGuridn,
      required: [true, 'Guardian information is required.'],
    },
    profileImage: {
      type: String,
      required: [true, 'Profile image is required.'],
    },
    localGuardian: { type: newLocalGurdn, required: false },
    isDeleted: { type: Boolean, default: false },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'academic-semester',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

const students = model<TStudent>('Students', studentSchema);
export default students;
