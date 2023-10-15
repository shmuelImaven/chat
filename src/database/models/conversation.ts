import { string } from 'joi';
import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IConversation extends Document {
  userId: string;
  id: string;
  creationTime: Date;
  recommendation?: string;
}

const conversationSchema = new Schema({
  userId: { type: String, required: true },
  Id: { type: String , default: uuidv4, required: true },
  creationTime: { type: Date, default: Date.now },
  recommendation: { type: String, default:"" },
});

const Conversation = model<IConversation>('Conversation', conversationSchema);

export default Conversation;