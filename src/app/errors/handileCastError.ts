import mongoose from 'mongoose';
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handileCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSurces: TErrorSource = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: ' Invalid Id ',
    errorSurces,
  };
};

export default handileCastError;
