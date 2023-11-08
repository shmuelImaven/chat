import * as messageAccessor from '../database/accessors/messageAccessor';

export const createConversation = async (userId: string, recommendation: string) => {
  return await messageAccessor.create({ userId, recommendation });
};

export const getConversation = async (id: string) => {
  return await messageAccessor.find(id);
};

export const updateConversation = async (id: string, data: any) => {
  return await messageAccessor.update(id, data);
};


export const deleteConversation = async (id: string) => {
  return await messageAccessor.remove(id);
};