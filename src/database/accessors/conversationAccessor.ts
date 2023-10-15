import logger from '../../logger';
import Conversation from '../models/conversation';

export const create = async (data: any) => {
  logger.info(`createConversation  ${create}`);
  const conversation = new Conversation(data);
  logger.info(`createConversation  ${conversation}`);

  return await conversation.save();
};

export const find = async (id: string) => {
  return await Conversation.findById(id);
};

export const update = async (id: string, data: any) => {
  return await Conversation.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Conversation.findByIdAndDelete(id);
};