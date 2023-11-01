import { Router } from 'express';
import * as conversationController from '../controllers/chatController';
import { chatSonicFunction } from '../services/sonicService';

const router = Router();

router.post('/chat', conversationController.postMessage);
router.post('/newChat', conversationController.startChat);
router.post('/recommendation', conversationController.sonicSummery);


export default router;