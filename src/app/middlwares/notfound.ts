import { NextFunction, Request, Response } from 'express';
const notFount = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Api Not found',
    error: '',
  });
  return;
};

export = notFount;
