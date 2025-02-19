import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../errors/AppError';
import Users from '../users/users.model';
import { TChengePassword, TLogingUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import confing from '../../confing';
import { createToken, sendEmail } from './auth.utils';
const authLogingUserForDb = async (playood: TLogingUser) => {
  const { id, password } = playood;

  const isUserExist = await Users.findOne({
    id,
  }).select('+password');

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this  user is not found');
  }

  const isDeletedExist = isUserExist.isDeleted;

  if (isDeletedExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'this  user already deleted for db'
    );
  }
  const checkStaust = isUserExist.status;

  if (checkStaust === 'blocked') {
    throw new AppError(StatusCodes.NOT_FOUND, 'this  user already blocked ');
  }

  //comper the password ----------

  const isPasswordMetch = await bcrypt.compare(password, isUserExist?.password);
  if (!isPasswordMetch) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      ' your id and password das not meatch'
    );
  }
  //create jwt  web token -------------
  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    confing.jwt_access_token as string,
    '3d'
  );
  const refreshToken = createToken(
    jwtPayload,
    confing.jwt_access_token as string,
    '44d'
  );

  return {
    accessToken,
    needsPasswordChange: isUserExist.needsPasswordChange,
    refreshToken,
  };
};
const chengePasswordForDb = async (
  user: JwtPayload,
  playood: TChengePassword
) => {
  const isUserExist = await Users.findOne({
    id: user.userId,
  }).select('+password');

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this  user is not found');
  }
  const isDeletedExist = isUserExist.isDeleted;

  if (isDeletedExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'this  user already deleted for db'
    );
  }
  const checkStaust = isUserExist.status;

  if (checkStaust === 'blocked') {
    throw new AppError(StatusCodes.NOT_FOUND, 'this  user already blocked ');
  }

  //comper the password ----------

  const isPasswordMetch = await bcrypt.compare(
    playood.oldPassword,
    isUserExist?.password
  );
  if (!isPasswordMetch) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      ' your id and password das not meatch'
    );
  }
  const hasNewPassword = await bcrypt.hash(
    playood.newPassword,
    Number(confing.bcrypt_solt_pass)
  );

  const result = await Users.findByIdAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: hasNewPassword,
      needsPasswordChange: false,
      passwordChengeAt: new Date(),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};
const refreshTokenDb = async (token: string) => {
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorization');
  }
  const decoded = jwt.verify(
    token,
    confing.jwt_refresh_token as string
  ) as JwtPayload;
  const role = decoded?.role;
  const id = decoded?.userId;
  const iat = decoded?.iat as number;

  const isUserExist = await Users.findOne({
    id,
  });
  const passwordChenageTime =
    ((isUserExist?.passwordChengeAt?.getTime() as number) / 1000) as number;
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this  user is not found');
  }
  const isDeletedExist = isUserExist.isDeleted;

  if (isDeletedExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'this  user already deleted for db'
    );
  }
  const checkStaust = isUserExist.status;

  if (checkStaust === 'blocked') {
    throw new AppError(StatusCodes.NOT_FOUND, 'this  user already blocked ');
  }

  if (passwordChenageTime > iat) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'ou are not authorization !');
  }

  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    confing.jwt_access_token as string,
    '4d'
  );
  return { accessToken };
};

const forgetPasswordForDb = async (playood: string) => {
  const isUserExist = await Users.findOne({ id: playood });
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this  user is not found');
  }
  const isDeletedExist = isUserExist.isDeleted;

  if (isDeletedExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'this  user already deleted for db'
    );
  }
  const checkStaust = isUserExist.status;

  if (checkStaust === 'blocked') {
    throw new AppError(StatusCodes.NOT_FOUND, 'this  user already blocked ');
  }

  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };

  const restToken = createToken(
    jwtPayload,
    confing.jwt_access_token as string,
    '8m'
  );

  const resetLink = `http://localhost:5173?id=${isUserExist.id}&&token=${restToken}`;
  sendEmail(isUserExist.email, resetLink);
  return null;
};
const resetPasswordForDb = async (
  playood: { id: string; newPassword: string },
  token: string
) => {
  const isUserExist = await Users.findOne({ id: playood.id });
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this  user is not found');
  }
  const isDeletedExist = isUserExist.isDeleted;

  if (isDeletedExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'this  user already deleted for db'
    );
  }
  const checkStaust = isUserExist.status;

  if (checkStaust === 'blocked') {
    throw new AppError(StatusCodes.NOT_FOUND, 'this  user already blocked ');
  }

  const decoded = jwt.verify(
    token,
    confing.jwt_access_token as string
  ) as JwtPayload;

  if (playood.id !== decoded.id) {
    throw new AppError(StatusCodes.FORBIDDEN, 'FORBIDDEN access ');
  }
  const hashNewPassword = bcrypt.hash(playood.newPassword, 10);
  if (!hashNewPassword) {
    throw new AppError(StatusCodes.FAILED_DEPENDENCY, 'solt generate problem ');
  }
  await Users.findOneAndUpdate(
    { id: isUserExist.id },
    {
      password: hashNewPassword,
    },
    {
      new: true,
      runValidators: true,
    }
  );
};
export const authService = {
  authLogingUserForDb,
  chengePasswordForDb,
  refreshTokenDb,
  forgetPasswordForDb,
  resetPasswordForDb,
};
