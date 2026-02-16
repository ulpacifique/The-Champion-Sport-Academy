// backend/src/routes/eventRoutes.ts
import { Router } from 'express';
import {
    getAllEvents,
    getEventsByType,
    createEvent,
    updateEvent,
    deleteEvent
} from '../controllers/eventController';
import { isAuthenticated, hasRole } from '../middleware/auth';

const router = Router();

router.get('/', getAllEvents);
router.get('/type/:type', getEventsByType);
router.post('/', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), createEvent);
router.put('/:id', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), updateEvent);
router.delete('/:id', isAuthenticated, hasRole(['ADMIN']), deleteEvent);

export default router;
