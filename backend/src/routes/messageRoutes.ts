// backend/src/routes/messageRoutes.ts
import { Router } from 'express';
import * as messageController from '../controllers/messageController';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

// All message routes require authentication
router.use(isAuthenticated);

router.get('/recipients', messageController.getRecipients);
router.get('/chats', messageController.getRecentChats);
router.get('/conversation/:partnerId', messageController.getConversation);
router.post('/', messageController.sendMessage);
router.put('/mark-read/:id', messageController.markAsRead);
router.delete('/conversation/:partnerId', messageController.deleteConversation);

export default router;
