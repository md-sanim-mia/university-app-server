import { asyncCatch } from '../../utility/async.catch';
import { offeredCourseService } from './offered.course.service';

const createOfferedCourse = asyncCatch(async (req, res) => {
  const playood = req.body;
  const result = await offeredCourseService.createOfferedCourseForDb(playood);

  res.status(200).json({
    success: true,
    message: 'crate offered course for db',
    data: result,
  });
});

const getAllOfferedCourse = asyncCatch(async (req, res) => {
  const result = await offeredCourseService.getAllOfferedCourseForDb(req.query);
  res.status(200).json({
    success: true,
    message: 'get offered course for db',
    data: result,
  });
});
const getSingleOfferedCourse = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseService.getSingleOfferedCourseForDb(id);

  res.status(200).json({
    success: true,
    message: 'get single offered course for db',
    data: result,
  });
});
const updateSingleOfferedCourse = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const playood = req.body;
  const result = await offeredCourseService.updateSingleOfferedCourseForDb(
    id,
    playood
  );

  res.status(200).json({
    success: true,
    message: 'update single semister registration  for db',
    data: result,
  });
});

const deleteSingleOfferedCourse = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseService.deletedOfferedCourseForDb(id);

  res.status(200).json({
    success: true,
    message: 'deleted single semister registration  for db',
    data: result,
  });
});

export const offeredCourseContllors = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateSingleOfferedCourse,
  deleteSingleOfferedCourse,
};
