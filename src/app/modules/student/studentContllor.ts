import { NextFunction, Request, Response } from 'express';
import { studentServices } from './student.service';

export const getAllStudnetForDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await studentServices.getaAllStudentDB();
    res.status(200).json({
      success: true,
      message: 'this is all student data',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const singleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'single student data find',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deletStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;

    const result = await studentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'student data is deleted',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studentPostCreate = {
  getAllStudnetForDb,
  singleStudent,
  deletStudent,
};
