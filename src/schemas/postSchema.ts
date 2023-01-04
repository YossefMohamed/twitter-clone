import mongoose, { PopulatedDoc } from "mongoose";
import { IUser } from "./userSchema";

const Schema = mongoose.Schema;

export interface IPost extends mongoose.Document {
  content: string;
  postedBy: PopulatedDoc<IUser>;
  likes: PopulatedDoc<IUser>[];
  retweetUsers: PopulatedDoc<IUser>[];
  retweetData: PopulatedDoc<IPost>;
  replyTo: PopulatedDoc<IPost>;
  pinned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  replies?: mongoose.Document<IPost>[];
}

const postSchema: mongoose.Schema<IPost> = new mongoose.Schema<IPost>(
  {
    content: { type: String, trim: true },
    pinned: { type: Boolean, default: false },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    retweetUsers: [
      { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    retweetData: { type: Schema.Types.ObjectId, ref: "Post" },
    replyTo: { type: Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true, virtuals: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
