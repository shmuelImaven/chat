import { Schema, model, Document } from 'mongoose';

export interface IConversation extends Document {
  userId: string;
  creationTime: Date;
  recommendation?: string;
}

const conversationSchema = new Schema({
  userId: { type: String, required: true },
  creationTime: { type: Date, default: Date.now },
  recommendation: { type: String },
});

const Conversation = model<IConversation>('Conversation', conversationSchema);

export default Conversation;