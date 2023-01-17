"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "profilePic.png" },
    coverPic: { type: String },
    following: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
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
userSchema.pre(/^find/, function (next) {
    this.populate([
        { path: "likes", select: "_id " },
        { path: "retweets", select: "_id " },
        {
            path: "followers",
            select: {
                _id: 1,
                username: 1,
                firstName: 1,
                lastName: 1,
                profilePic: 1,
            },
        },
    ]);
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
