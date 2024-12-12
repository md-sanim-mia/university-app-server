import { asyncCatch } from '../../utility/async.catch';
import { courseService } from './course.service';

const createCourse = asyncCatch(async (req, res) => {
  const playood = req.body;
  const result = await courseService.createCourseForDb(playood);

  res
    .status(200)
    .json({ success: true, message: 'crate course for db', data: result });
});
const getAllCourse = asyncCatch(async (req, res) => {
  const result = await courseService.getAllCourseForDb(req.query);
  res
    .status(200)
    .json({ success: true, message: 'get all course for db', data: result });
});
const getSingleCourse = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.getSingleCourseForDb(id);

  res.status(200).json({
    success: true,
    message: 'get single course for db',
    data: result,
  });
});
const updateSingleCourse = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const playood = req.body;
  const result = await courseService.updateSingleCourseForDb(id, playood);

  res.status(200).json({
    success: true,
    message: 'update single course for db',
    data: result,
  });
});
const deleteSingleCourse = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.deleteSingleCourseForDb(id);

  res.status(200).json({
    success: true,
    message: 'deleted single course for db',
    data: result,
  });
});

const assingFacultiesWithCourse = asyncCatch(async (req, res) => {
  const { courseId } = req.params;
  const playood = req.body;
  const result = await courseService.assingFacultiesWithCourseForDb(
    courseId,
    playood
  );

  res.status(200).json({
    success: true,
    message: 'add to facultes course for db',
    data: result,
  });
});
const removeFacultiesWithCourse = asyncCatch(async (req, res) => {
  const { courseId } = req.params;
  const playood = req.body;
  const result = await courseService.removeFacultiesWithCourseForDb(
    courseId,
    playood
  );

  res.status(200).json({
    success: true,
    message: 'remove to facultes course for db',
    data: result,
  });
});

export const courseContllor = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteSingleCourse,
  updateSingleCourse,
  assingFacultiesWithCourse,
  removeFacultiesWithCourse,
};
