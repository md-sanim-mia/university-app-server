import { NextFunction, Request, Response } from 'express';

const gobalErrorHandilers = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || 'somthing waent wrong';

  res.status(statuscode).json({
    success: false,
    message,
    error: err,
  });
  return;
};

export = gobalErrorHandilers;
