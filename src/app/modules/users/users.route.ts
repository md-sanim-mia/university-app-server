import express from 'express';
import { usersContllors } from './users.contllor';
const router = express.Router();

router.post('/create-student', usersContllors.createStudent);

export const userRouters = router;
