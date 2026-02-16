// backend/src/routes/coachRoutes.ts
import { Router } from 'express';
import {
    getAllCoaches,
    getCoachById,
    registerCoach,
    getMyAthletes,
    getDashboardStats,
    updateCoach,
    deleteCoach
} from '../controllers/coachController';
import { isAuthenticated, hasRole } from '../middleware/auth';

const router = Router();

// Test endpoint
router.post('/test', (req, res) => {
    console.log('TEST ENDPOINT HIT - POST /api/coaches/test');
    res.json({ message: 'Test endpoint working', body: req.body });
});

router.get('/', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), getAllCoaches);
router.get('/dashboard/stats', isAuthenticated, hasRole(['COACH', 'ADMIN']), getDashboardStats);
router.get('/my/athletes', isAuthenticated, hasRole(['COACH', 'ADMIN']), getMyAthletes);
router.get('/:id', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), getCoachById);
router.put('/:id', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), updateCoach);
router.delete('/:id', isAuthenticated, hasRole(['ADMIN']), deleteCoach);

// Log all POST requests to /coaches
router.post('/', (req, res, next) => {
    console.log('POST /api/coaches - Request received');
    next();
}, isAuthenticated, hasRole(['ADMIN']), registerCoach);

export default router;
