import { Request, Response } from 'express';
import Joi from 'joi';
import { getResponseFromGPT } from '../services/chatService';
import logger from '../logger';

const postMessage = async (req: Request, res: Response): Promise<void> => {
  logger.info("Message arrived");
  const schema = Joi.object({
    content: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    logger.error(error.details[0].message);
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  try {
    if (!req.headers["user-id"]){
      logger.error("User is not authenticated");
      throw Error("User is not authenticated");
    }

    const response = await getResponseFromGPT(req.headers["user-id"].toString(), req.body.content);
    res.json({ response });
  } catch (error) {
    logger.error('Error processing the message:', error);
    res.status(500).json({ error: 'Error processing the message' });
  }
};

export { postMessage };