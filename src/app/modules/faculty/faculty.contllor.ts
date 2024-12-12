import { asyncCatch } from '../../utility/async.catch';
import { facultyService } from './faculty.service';

const getAllFaculty = asyncCatch(async (req, res) => {
  const result = await facultyService.getAllFacultyForDb(req.query);

  res
    .status(200)
    .json({ success: true, message: 'get all faculty for db', data: result });
});
const getSingleFaculty = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await facultyService.getSingleFacultyForDb(id);

  res.status(200).json({
    success: true,
    message: 'get single faculty for db',
    data: result,
  });
});
const updateSingleFaculty = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const playood = req.body;
  const result = await facultyService.updateSingleFacultyForDB(id, playood);

  res.status(200).json({
    success: true,
    message: 'update single faculty for db',
    data: result,
  });
});
const deleteSingleFaculty = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const playood = req.body;
  const result = await facultyService.deletedSingleFacultyForDb(id);

  res.status(200).json({
    success: true,
    message: 'deleted single faculty for db',
    data: result,
  });
});

export const facultyContllors = {
  getAllFaculty,
  getSingleFaculty,
  updateSingleFaculty,
  deleteSingleFaculty,
};
