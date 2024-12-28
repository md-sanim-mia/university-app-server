import { usersServices } from './users.service';
import { asyncCatch } from '../../utility/async.catch';
import { AppError } from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import confing from '../../confing';
const createStudent = asyncCatch(async (req, res) => {
  const { password, student: satudentData } = req.body;
  console.log(req?.file);
  const result = await usersServices.createStudentForDB(
    req?.file,
    password,
    satudentData
  );
  res.status(200).json({
    success: true,
    message: 'student is create success fully',
    data: result,
  });
});
const createFaculty = asyncCatch(async (req, res) => {
  const { password, student: playood } = req.body;
  const result = await usersServices.createFacultyForDb(password, playood);
  res.status(200).json({
    success: true,
    message: 'faculty is create success fully',
    data: result,
  });
});
const getMe = asyncCatch(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new AppError(StatusCodes.NOT_FOUND, 'you are not authorization');
  }
  const decoded = jwt.verify(
    token,
    confing.jwt_access_token as string
  ) as JwtPayload;
  const id = decoded?.id;
  const role = decoded?.role;
  const result = await usersServices.getMeForDb(id, role);
  res.status(200).json({
    success: true,
    message: 'get your data',
    data: result,
  });
});
const chengeStaust = asyncCatch(async (req, res) => {
  const sataus = req?.body;
  const { id } = req.params;

  const result = await usersServices.chengeStaustForDb(id, sataus);
  res.status(200).json({
    success: true,
    message: 'user status success fully chenge ',
  });
});

export const usersContllors = {
  createStudent,
  createFaculty,
  getMe,
  chengeStaust,
};
