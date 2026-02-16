// backend/src/routes/salaryRoutes.ts
import { Router } from 'express';
import {
    recordSalary,
    getAllSalaries,
    exportSalariesExcel
} from '../controllers/salaryController';
import { isAuthenticated, hasRole } from '../middleware/auth';

const router = Router();

router.get('/', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), getAllSalaries);
router.post('/record', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), recordSalary);
router.get('/export', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), exportSalariesExcel);

export default router;
