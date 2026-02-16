import { Router } from 'express';
import {
    getAllImages,
    getImagesByCategory,
    uploadImage,
    deleteImage
} from '../controllers/galleryController';
import { upload } from '../config/multer';

const router = Router();

router.get('/', getAllImages);
router.get('/category/:category', getImagesByCategory);
router.post('/upload', upload.single('file'), uploadImage);
router.delete('/:id', deleteImage);

export default router;
