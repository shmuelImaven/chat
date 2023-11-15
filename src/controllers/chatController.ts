import { Request, Response } from 'express';
import Joi from 'joi';
import * as chatService from  '../services/chatService';
import logger from '../logger';
import * as conversationService from '../services/conversationService';
import { chatSonicFunction } from '../services/sonicService';

const postMessage = async (req: Request, res: Response): Promise<void> => {
  logger.info("Message arrived");
  const schema = Joi.object({
    content: Joi.string().required(),
    conversationId: Joi.string().required()
  });

  const { error } = schema.validate(req.body);

  if (error) {
    logger.error('###########',error.details[0].message);
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
    logger.info('+++++++++++',req?.user)
    if (!req.user){
      logger.error("User is not authenticated");
      throw Error("User is not authenticated");
    }

    const response = await chatService.getResponseFromGPT(req.body.conversationId, req.body.content);
    res.json({ response });
  } catch (error) {
    logger.error('Error processing the message:', error);
    res.status(500).json({ error: 'Error processing the message' });
  }
};

const sonicSummery= async (req: Request, res: Response): Promise<void> => {
  logger.info("sonicSummery")
  const response =  await chatSonicFunction(req.body.content.txt)
  res.json({ response });

}

const startChat = async (req: Request, res: Response): Promise<void> => {
  logger.info("Start Chat request");
  try {
    if (!req.user){
      logger.error("User is not authenticated");
      throw Error("User is not authenticated");
    }

    logger.info("startChat sub",JSON.stringify(req.body))

    const userId = req.user.sub;
    logger.info(`USERID  ${userId}`);

   // const recommendation = req.body.recommendation;
    const conversation = await conversationService.createConversation(userId);
  // const response = await chatService.getResponseFromGPT(conversation._id, req.body.content);
    res.status(201).json(conversation._id);
} catch (error) {
  logger.error(error)
    res.status(500).json({ error: 'Failed to start a new conversation.' });
}
};

export { postMessage, startChat, sonicSummery };