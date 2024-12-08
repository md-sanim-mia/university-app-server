import mongoose from 'mongoose';
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handileValidationErrors = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSurces: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: ' validation error ',
    errorSurces,
  };
};

export default handileValidationErrors;
