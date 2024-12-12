import express from 'express';
import { facultyContllors } from './faculty.contllor';

const router = express.Router();

router.get('/get-faculty', facultyContllors.getAllFaculty);
router.get('/:id', facultyContllors.getSingleFaculty);
router.patch('/:id', facultyContllors.updateSingleFaculty);
router.delete('/:id', facultyContllors.deleteSingleFaculty);

export const facultyRouters = router;
