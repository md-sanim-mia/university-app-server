import { USER_ROLE } from './auth.constan';

export type TLogingUser = {
  id: string;
  password: string;
};
export type TChengePassword = {
  oldPassword: string;
  newPassword: string;
};

export type TUserRole = keyof typeof USER_ROLE;
