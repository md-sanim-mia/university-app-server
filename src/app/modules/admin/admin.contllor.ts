import { asyncCatch } from '../../utility/async.catch';
import { adminService } from './admin.service';

const getAllAdmin = asyncCatch(async (req, res) => {
  const result = await adminService.getAllAdminForDb(req.query);

  res
    .status(200)
    .json({ success: true, message: 'get all faculty for db', data: result });
});
const getSingleAdmin = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.getSingleAdminForDb(id);

  res.status(200).json({
    success: true,
    message: 'get single faculty for db',
    data: result,
  });
});
const updateSingleAdmin = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const playood = req.body;
  const result = await adminService.updateSingleAdminForDb(id, playood);

  res.status(200).json({
    success: true,
    message: 'update single faculty for db',
    data: result,
  });
});
const deleteSingleAdmin = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.deleteSingleAdminForDb(id);

  res.status(200).json({
    success: true,
    message: 'deleted single faculty for db',
    data: result,
  });
});

export const adminContllors = {
  getAllAdmin,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
};
