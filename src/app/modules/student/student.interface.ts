// 1. Create an interface representing a document in MongoDB.

import { Model, Types } from 'mongoose';

export type userName = {
  firstName: string;
  middleName?: string; // optional
  lastName: string;
};

export type gurdingName = {
  fatherName: string;
  motherName: string;
  fatherContactNumber: string;
  motherContactNumber: string;
  fatherEmail: string;
  motherEmail: string;
};
export type localGuardian = {
  name: string;
  relation: string;
  contactNumber: string;
  email: string;
};

export type TStudent = {
  name: userName;
  gender: 'male' | 'female';
  id: string;
  user: Types.ObjectId;
  contactNumber: string;
  emergencyContactNumber: string;
  email: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  birth: string; // Date of birth
  address: string; // Current address
  permanentAddress: string; // Permanent address
  guardian: gurdingName;
  profileImage: String;
  localGuardian?: localGuardian; // optional field for local guardian
  isDeleted: boolean;
  admissionSemester: Types.ObjectId;
};
