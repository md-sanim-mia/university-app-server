import { ZodError, ZodIssue } from 'zod';
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interface/error.interface';

export const handileZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSurces: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: ' validation error ',
    errorSurces,
  };
};
