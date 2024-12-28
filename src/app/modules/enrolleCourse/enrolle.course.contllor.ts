import { asyncCatch } from '../../utility/async.catch';
import { EnrolledCourseSerivce } from './enrolle.course.service';

const createEnrolledCourse = asyncCatch(async (req, res) => {
  const userId = req?.user?.userId;
  const result = await EnrolledCourseSerivce.createEnrolledCourseIntoDB(
    userId,
    req.body
  );

  res.status(200).json({
    success: true,
    message: 'student success fully erolled',
    data: result,
  });
});

export const enrolledCourseContllors = {
  createEnrolledCourse,
};
