import { NextFunction, Request, Response } from 'express';
import { usersServices } from './users.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: satudentData } = req.body;

    const result = await usersServices.createStudentForDB(
      password,
      satudentData
    );
    res.status(200).json({
      success: true,
      message: 'student is create success',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const usersContllors = {
  createStudent,
};
