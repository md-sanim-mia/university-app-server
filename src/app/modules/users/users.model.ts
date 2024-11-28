import { model, Schema } from 'mongoose';
import { Tusers } from './users.interface';
import confing from '../../confing';
import bcrypt from 'bcrypt';
const usersSchema = new Schema<Tusers>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: false },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

usersSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(confing.bcrypt_solt_pass)
  );
  next();
});

usersSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

usersSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
usersSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
usersSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

const Users = model<Tusers>('users', usersSchema);

export default Users;
