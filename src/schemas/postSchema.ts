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

postSchema.virtual("replies", {
  ref: "Post",
  localField: "_id",
  foreignField: "replyTo",
});

postSchema.pre(/^find/, async function (this, next) {
  console.log(await this.model.findOne(this.getQuery()));

  this.populate("replies");
  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
