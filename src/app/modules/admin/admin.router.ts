import express from 'express';
import { adminContllors } from './admin.contllor';

const router = express.Router();

router.get('/get-all-admin', adminContllors.getAllAdmin);
router.get('/:id', adminContllors.getSingleAdmin);
router.patch('/:id', adminContllors.updateSingleAdmin);
router.delete('/:id', adminContllors.deleteSingleAdmin);

export const adminRouters = router;
