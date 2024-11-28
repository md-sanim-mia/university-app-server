import express from 'express';
import { studentPostCreate } from './studentContllor';

const router = express.Router();

router.get('/get-student', studentPostCreate.getAllStudnetForDb);
router.get('/:studentId', studentPostCreate.deletStudent);
router.delete('/:studentId', studentPostCreate.deletStudent);

export const studentRouter = router;
