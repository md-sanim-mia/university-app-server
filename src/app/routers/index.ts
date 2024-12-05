import { Router } from 'express';
import { userRouters } from '../modules/users/users.route';
import { studentRouter } from '../modules/student/student.route';
import { academicSemesterRouter } from '../modules/AcademicSemester/academic.semester.router';
import { academicFacultyRouter } from '../modules/academicFaculty/academic.faculty.route';
import { academicDepartmentRouter } from '../modules/academicDepartment/academic.department.routers';

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
  {
    path: '/academic-faculty',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-department',
    route: academicDepartmentRouter,
  },
];

modulesRouter.forEach((route) => router.use(route.path, route.route));
export default router;
