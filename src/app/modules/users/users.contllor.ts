import { usersServices } from './users.service';
import { asyncCatch } from '../../utility/async.catch';

const createStudent = asyncCatch(async (req, res) => {
  const { password, student: satudentData } = req.body;

  const result = await usersServices.createStudentForDB(password, satudentData);
  res.status(200).json({
    success: true,
    message: 'student is create success',
    data: result,
  });
});

export const usersContllors = {
  createStudent,
};
