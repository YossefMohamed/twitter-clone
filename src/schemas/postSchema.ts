import mongoose, { PopulatedDoc } from "mongoose";
import { IUser } from "./userSchema";

const Schema = mongoose.Schema;

export interface IPost extends mongoose.Document {
  content: string;
  postedBy: PopulatedDoc<IUser>;
  pinned: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const postSchema = new Schema(
  {
    content: { type: String, required: true, trim: true },
    pinned: { type: Boolean, default: false },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
