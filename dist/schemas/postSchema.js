"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const postSchema = new mongoose_1.default.Schema({
    content: { type: String, trim: true },
    pinned: { type: Boolean, default: false },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    retweetUsers: [
        { type: Schema.Types.ObjectId, ref: "User", required: true },
    ],
    retweetData: { type: Schema.Types.ObjectId, ref: "Post" },
    replyTo: { type: Schema.Types.ObjectId, ref: "Post" },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
postSchema.virtual("replies", {
    ref: "Post",
    localField: "_id",
    foreignField: "replyTo",
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.default = Post;
