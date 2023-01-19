import mongoose, { PopulatedDoc } from "mongoose";
import { IChat } from "./chatSchema";
import { IUser } from "./userSchema";

const Schema = mongoose.Schema;

export interface IMessage extends mongoose.Document {
  sender: PopulatedDoc<IUser>;
  readBy: PopulatedDoc<IUser>;
  chat: PopulatedDoc<IChat>;
  content: string;
}

const messageSchema: mongoose.Schema<IMessage> = new mongoose.Schema<IMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
