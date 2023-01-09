import mongoose, { PopulatedDoc, Schema } from "mongoose";
import { IMessage } from "./messageSchema";
import { IUser } from "./userSchema";

export interface IChat extends mongoose.Document {
  chatName: string;
  isGroupChat: boolean;
  users: PopulatedDoc<IUser>[];
  latestMessage: PopulatedDoc<IMessage>;
}

const chatSchema: mongoose.Schema<IChat> = new mongoose.Schema<IChat>(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    latestMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
