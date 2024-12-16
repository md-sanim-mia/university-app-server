import { asyncCatch } from '../../utility/async.catch';
import { semesterRegistrationSerice } from './semester.registration.service';

const createSemisterRegistration = asyncCatch(async (req, res) => {
  const playood = req.body;
  const result =
    await semesterRegistrationSerice.createSemesterRegistrationForDb(playood);

  res.status(200).json({
    success: true,
    message: 'crate semister registration for db',
    data: result,
  });
});
const getAllSemisterRegistration = asyncCatch(async (req, res) => {
  const result = await semesterRegistrationSerice.getSemesterRegistrationForDb(
    req.query
  );
  res.status(200).json({
    success: true,
    message: 'get asemister registration for db',
    data: result,
  });
});
const getSingleSemisterRegistration = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationSerice.getSingleSemisterRegistrationForDb(id);

  res.status(200).json({
    success: true,
    message: 'get single semister registration  for db',
    data: result,
  });
});
const updateSingleSemisterRegistration = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const playood = req.body;
  const result =
    await semesterRegistrationSerice.updateSemisterRegistrationForDb(
      id,
      playood
    );

  res.status(200).json({
    success: true,
    message: 'update single semister registration  for db',
    data: result,
  });
});
const deletedSingleSemisterRegistration = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationSerice.deleteSemisterRegistrationForDb(id);

  res.status(200).json({
    success: true,
    message: 'deleted single semister registration  for db',
    data: result,
  });
});

export const semesterRegistrationContllors = {
  createSemisterRegistration,
  getAllSemisterRegistration,
  getSingleSemisterRegistration,
  updateSingleSemisterRegistration,
  deletedSingleSemisterRegistration,
};
