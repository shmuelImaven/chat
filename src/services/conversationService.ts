import * as conversationAccessor from '../database/accessors/conversationAccessor';

export const createConversation = async (userId: string, recommendation: string) => {
  return await conversationAccessor.create({ userId, recommendation });
};

export const getConversation = async (id: string) => {
  return await conversationAccessor.find(id);
};

export const updateConversation = async (id: string, data: any) => {
  return await conversationAccessor.update(id, data);
};

export const deleteConversation = async (id: string) => {
  return await conversationAccessor.remove(id);
};