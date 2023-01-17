"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostRouter = void 0;
const express_1 = require("express");
const postSchema_1 = __importDefault(require("../../../schemas/postSchema"));
const router = (0, express_1.Router)();
exports.getPostRouter = router;
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let post = yield postSchema_1.default.findOne({
        _id: req.params.id,
    }).sort("createdAt");
    if (!post) {
        return res.status(404).json({
            status: "failed",
            message: "Post not found",
        });
    }
    const replies = yield postSchema_1.default.find({
        replyTo: post._id,
    }).populate([
        {
            path: "replies",
            select: "_id",
        },
        {
            path: "postedBy",
            select: "_id name profilePic firstName lastName username",
        },
        {
            path: "retweetData",
            populate: [
                {
                    path: "replies",
                    select: "_id",
                },
                {
                    path: "postedBy",
                    select: "_id name profilePic firstName lastName username",
                },
            ],
        },
        {
            path: "replyTo",
            populate: {
                path: "postedBy",
                select: "_id name profilePic firstName lastName username",
            },
        },
    ]);
    post = yield post.populate([
        {
            path: "replies",
            select: "_id",
        },
        {
            path: "postedBy",
            select: "_id name profilePic firstName lastName username",
        },
        {
            path: "retweetData",
            populate: [
                {
                    path: "postedBy",
                    select: "_id name profilePic firstName lastName username",
                },
                {
                    path: "replies",
                    select: "_id",
                },
            ],
        },
        {
            path: "replyTo",
            populate: {
                path: "postedBy",
                select: "_id name profilePic firstName lastName username",
            },
        },
    ]);
    const result = {
        post,
        replies,
    };
    res.status(200).json({
        status: "ok",
        data: result,
    });
}));
