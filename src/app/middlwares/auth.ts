import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { asyncCatch } from '../utility/async.catch';
import jwt, { JwtPayload } from 'jsonwebtoken';
import confing from '../confing';
import { TUserRole } from '../modules/Auth/auth.interface';
import Users from '../modules/users/users.model';
const auth = (...requiredRoles: TUserRole[]) => {
  return asyncCatch(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorization');
    }
    const decoded = jwt.verify(
      token,
      confing.jwt_access_token as string
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
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'ou are not authorization !'
      );
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'you are not authorization !'
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
