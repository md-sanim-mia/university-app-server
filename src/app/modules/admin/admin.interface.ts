// 1. Create an interface representing a document in MongoDB.
import { Types } from 'mongoose';

export type TuserName = {
  firstName: string;
  middleName?: string; // optional
  lastName: string;
};
export type TGenders = 'male' | 'female' | 'other';
export type TBloodGroups =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type TAdmin = {
  id: string;
  name: TuserName;
  user: Types.ObjectId;
  designation: string;
  gender: TGenders;
  contactNumber: string;
  emergencyContactNumber: string;
  email: string;
  bloodGroup: TBloodGroups;
  birth: string; // Date of birth
  address: string; // Current address
  permanentAddress: string; // Permanent address
  profileImage: String;
  isDeleted?: boolean;
};
