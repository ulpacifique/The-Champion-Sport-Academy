// backend/src/routes/progressRoutes.ts
import { Router } from 'express';
import { getProgressByChild, updateProgress } from '../controllers/progressController';
import { isAuthenticated, hasRole } from '../middleware/auth';

const router = Router();
console.log("Loading progress routes...");
console.log("updateProgress type:", typeof updateProgress);

// Debug route
router.post('/test', (req, res) => {
    res.json({ message: "Progress routes are working" });
});

// Get progress for a specific child
router.get('/:childId', isAuthenticated, getProgressByChild);

// Create or update progress record
router.post('/',
    (req, res, next) => {
        console.log("[ProgressRoute] POST / matched");
        next();
    },
    isAuthenticated,
    hasRole(['ADMIN', 'COACH', 'MANAGER']),
    (req, res, next) => {
        console.log("[ProgressRoute] Pre-controller check");
        if (typeof updateProgress !== 'function') {
            console.error("[ProgressRoute] updateProgress is NOT a function!");
            return res.status(500).json({ error: "Controller failure" });
        }
        next();
    },
    updateProgress
);

export default router;
