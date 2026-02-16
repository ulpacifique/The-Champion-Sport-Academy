// backend/src/routes/programRoutes.ts
import { Router } from 'express';
import {
    getAllPrograms,
    getActivePrograms,
    getProgramById,
    createProgram,
    updateProgram,
    deleteProgram
} from '../controllers/programController';
import { isAuthenticated, hasRole } from '../middleware/auth';

const router = Router();

router.get('/', getAllPrograms);
router.get('/active', getActivePrograms);
router.get('/:id', getProgramById);
router.post('/', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), createProgram);
router.put('/:id', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), updateProgram);
router.delete('/:id', isAuthenticated, hasRole(['ADMIN']), deleteProgram);

export default router;
