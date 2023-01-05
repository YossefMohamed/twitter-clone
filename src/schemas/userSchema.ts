import mongoose, { PopulatedDoc } from "mongoose";

const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  createdAt?: Date;
  updatedAt?: Date;
  following: PopulatedDoc<IUser>[];
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "/images/profilePic.png" },
    following: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("likes", {
  ref: "Post",
  localField: "_id",
  foreignField: "likes",
});

userSchema.virtual("retweets", {
  ref: "Post",
  localField: "_id",
  foreignField: "retweetUsers",
});

userSchema.virtual("followers", {
  ref: "User",
  localField: "_id",
  foreignField: "following",
});

userSchema.pre(/^find/, function (this, next) {
  this.populate([
    { path: "likes", select: "_id -likes" },
    { path: "retweets", select: "_id -retweetUsers" },
    { path: "followers", select: "_id -likes" },
  ]);
  next();
});
const User = mongoose.model("User", userSchema);
export default User;
