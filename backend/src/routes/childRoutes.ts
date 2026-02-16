// backend/src/routes/childRoutes.ts
import { Router } from 'express';
import {
    registerChild,
    getAllChildren,
    getMyChildren,
    getChildById,
    updateChild,
    deleteChild,
    approveChild,
    rejectChild
} from '../controllers/childController';
import { isAuthenticated, hasRole } from '../middleware/auth';

const router = Router();

router.post('/register', isAuthenticated, registerChild);
router.get('/', isAuthenticated, hasRole(['ADMIN', 'MANAGER', 'COACH']), getAllChildren);
router.get('/my-children', isAuthenticated, hasRole(['PARENT']), getMyChildren);
router.get('/pending', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), (req, res, next) => {
    req.query.registrationStatus = 'PENDING';
    getAllChildren(req, res);
});
router.get('/:id', isAuthenticated, getChildById);
router.put('/:id', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), updateChild);
router.delete('/:id', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), deleteChild);
router.post('/:id/approve', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), approveChild);
router.post('/:id/reject', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), rejectChild);

export default router;
