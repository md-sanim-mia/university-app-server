import { Router } from 'express';
import { userRouters } from '../modules/users/users.route';
import { studentRouter } from '../modules/student/student.route';
import { academicSemesterRouter } from '../modules/AcademicSemester/academic.semester.router';
import { academicFacultyRouter } from '../modules/academicFaculty/academic.faculty.route';
import { academicDepartmentRouter } from '../modules/academicDepartment/academic.department.routers';
import { facultyRouters } from '../modules/faculty/faculty.router';
import { adminRouters } from '../modules/admin/admin.router';
import { courseRouters } from '../modules/course/course.router';
import { semesterRegistrationRouter } from '../modules/semesterRegistration/semester.registration.router';
import { offeredCourseRouter } from '../modules/offeredCourse/offered.course.rourer';
import { loginUserRouter } from '../modules/Auth/auth.router';

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
  {
    path: '/faculty',
    route: facultyRouters,
  },
  {
    path: '/admin',
    route: adminRouters,
  },
  {
    path: '/course',
    route: courseRouters,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRouter,
  },
  {
    path: '/offered-course',
    route: offeredCourseRouter,
  },
  {
    path: '/auth',
    route: loginUserRouter,
  },
];

modulesRouter.forEach((route) => router.use(route.path, route.route));
export default router;
