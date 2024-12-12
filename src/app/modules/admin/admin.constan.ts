import { TBloodGroups, TGenders } from './admin.interface';

export const Gender: TGenders[] = ['male', 'female', 'other'];
export const BloodGroups: TBloodGroups[] = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
];
export const adminSearchbleFields = [
  'email',
  'name.firstName',
  ' address',
  'id',
];
