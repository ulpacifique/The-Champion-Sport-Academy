// backend/src/routes/paymentRoutes.ts
import { Router } from 'express';
import {
    recordPayment,
    getAllPayments,
    getMyChildrenPayments,
    updatePaymentStatus
} from '../controllers/paymentController';
import { isAuthenticated, hasRole } from '../middleware/auth';

const router = Router();

router.post('/', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), recordPayment);
router.get('/', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), getAllPayments);
router.get('/my-children', isAuthenticated, hasRole(['PARENT']), getMyChildrenPayments);
router.put('/:id/status', isAuthenticated, hasRole(['ADMIN']), updatePaymentStatus);

export default router;
