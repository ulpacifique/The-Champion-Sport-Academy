// backend/src/routes/videoRoutes.ts
import { Router } from 'express';
import {
    getAllVideos,
    getVideosByCategory,
    getVideoById,
    getCategories,
    createVideo,
    updateVideo,
    incrementViews,
    deleteVideo
} from '../controllers/videoController';
import { upload } from '../config/multer';
import { isAuthenticated, hasRole } from '../middleware/auth';

const router = Router();

router.get('/', getAllVideos);
router.get('/categories', getCategories);
router.get('/category/:category', getVideosByCategory);
router.get('/:id', getVideoById);
router.post('/', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), upload.single('thumbnailFile'), createVideo);
router.put('/:id', isAuthenticated, hasRole(['ADMIN', 'MANAGER']), upload.single('thumbnailFile'), updateVideo);
router.post('/:id/view', incrementViews);
router.delete('/:id', isAuthenticated, hasRole(['ADMIN']), deleteVideo);

export default router;
