import { Router } from 'express';
import { userRouters } from '../modules/users/users.route';
import { studentRouter } from '../modules/student/student.route';
import { academicSemesterRouter } from '../modules/AcademicSemester/academic.semester.router';

const router = Router();
const modulesRouter = [
  {
    path: '/users',
    route: userRouters,
  },
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRouter,
  },
];

modulesRouter.forEach((route) => router.use(route.path, route.route));
export default router;
