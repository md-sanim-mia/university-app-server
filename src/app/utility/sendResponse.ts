import { Response } from 'express';
type TResponse<T> = {
  statustCode: number;
  success: true;
  message?: boolean;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statustCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
