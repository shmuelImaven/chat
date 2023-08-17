import Message from '../models/message';

export const create = async (data: any) => {
  const conversation = new Message(data);
  return await conversation.save();
};

export const find = async (id: string) => {
  return await Message.findById(id);
};

export const update = async (id: string, data: any) => {
  return await Message.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string) => {
  return await Message.findByIdAndDelete(id);
};