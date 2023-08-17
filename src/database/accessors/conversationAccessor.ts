import Conversation from '../models/conversation';

export const create = async (data: any) => {
  const conversation = new Conversation(data);
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