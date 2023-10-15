import { Router } from 'express';
import * as conversationController from '../controllers/chatController';

const router = Router();

router.post('/chat', conversationController.postMessage);
router.post('/newChat', conversationController.startChat);


export default router;