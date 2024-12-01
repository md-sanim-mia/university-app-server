import { studentServices } from './student.service';
import { asyncCatch } from '../../utility/async.catch';
export const getAllStudnetForDb = asyncCatch(async (req, res, next) => {
  const result = await studentServices.getaAllStudentDB();
  res.status(200).json({
    success: true,
    message: 'this is all student data',
    data: result,
  });
});

export const singleStudent = asyncCatch(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'single student data find',
    data: result,
  });
});

export const deletStudent = asyncCatch(async (req, res) => {
  const { studentId } = req.params;

  const result = await studentServices.deleteStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'student data is deleted',
    data: result,
  });
});

export const studentPostCreate = {
  getAllStudnetForDb,
  singleStudent,
  deletStudent,
};
