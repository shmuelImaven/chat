import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
  conversationId: string;
  time: Date;
  sender: string;
  receiver: string;
}

const messageSchema = new Schema({
  conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  time: { type: Date, default: Date.now },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
});

const Message = model<IMessage>('Message', messageSchema);

export default Message;
