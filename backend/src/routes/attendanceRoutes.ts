// backend/src/routes/attendanceRoutes.ts
import { Router } from 'express';
import {
    markAttendance,
    markBulkAttendance,
    getAttendanceByProgram,
    getAttendanceByChild,
    getAttendanceByCoach
} from '../controllers/attendanceController';
import { isAuthenticated, hasRole } from '../middleware/auth';

const router = Router();

router.post('/', isAuthenticated, hasRole(['COACH', 'MANAGER']), markAttendance);
router.post('/bulk', isAuthenticated, hasRole(['COACH', 'MANAGER']), markBulkAttendance);
router.get('/program/:programId', isAuthenticated, hasRole(['COACH', 'MANAGER', 'ADMIN']), getAttendanceByProgram);
router.get('/child/:childId', isAuthenticated, getAttendanceByChild);
router.get('/coach/:coachId', isAuthenticated, hasRole(['COACH', 'MANAGER', 'ADMIN']), getAttendanceByCoach);

export default router;
