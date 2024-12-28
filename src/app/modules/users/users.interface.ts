import { Model } from 'mongoose';

export interface Tusers {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  passwordChengeAt?: Date;
  email: string;
}

export interface UserModel extends Model<Tusers> {
  // myStatsticMethod(): number;

  isUserExistsByCustomId(id: string): Promise<Tusers>;
}
