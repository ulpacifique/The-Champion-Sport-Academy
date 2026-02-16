// backend/src/routes/dashboardRoutes.ts
import { Router } from 'express';
import { getStats, getParentDashboardStats } from '../controllers/dashboardController';
import { isAuthenticated, hasRole } from '../middleware/auth';

const router = Router();

router.get('/stats', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), getStats);
router.get('/parent/stats', isAuthenticated, hasRole(['PARENT']), getParentDashboardStats);

export default router;
