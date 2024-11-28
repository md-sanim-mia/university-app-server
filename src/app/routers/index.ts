import { Router } from 'express';
import { userRouters } from '../modules/users/users.route';
import { studentRouter } from '../modules/student/student.route';

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
];

modulesRouter.forEach((route) => router.use(route.path, route.route));
export default router;
