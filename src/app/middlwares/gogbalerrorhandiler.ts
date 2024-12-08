import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error.interface';
import confing from '../confing';
import { handileZodError } from '../errors/handileZodError';
import handileValidationErrors from '../errors/handileValidationError';
import handileCastError from '../errors/handileCastError';
import { AppError } from '../errors/AppError';

const gobalErrorHandilers = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // -------- difiend defult value ---------
  let statusCode = err.statuscode || 500;
  let message = err.message || 'somthing waent wrong';

  let errorSurces: TErrorSource = [
    { path: '', message: 'somthing waent wrong' },
  ];
  // --------zood validation error hadile ---------
  if (err instanceof ZodError) {
    const simplifiedError = handileZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSurces = simplifiedError.errorSurces;
    // --------mongoose validatin  error hadile ---------
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handileValidationErrors(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSurces = simplifiedError.errorSurces;

    // --------mongoose cast  error hadile ---------
  } else if (err?.name === 'CastError') {
    const simplifiedError = handileCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSurces = simplifiedError.errorSurces;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSurces = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSurces = [
      {
        path: '',
        message: err.message,
      },
    ];
  }

  // -------- success full send error message fontend  ---------
  res.status(statusCode).json({
    success: false,
    message,
    errorSurces,
    stack: confing.node_env === 'development' ? err?.stack : null,
  });
  return;
};

export = gobalErrorHandilers;
