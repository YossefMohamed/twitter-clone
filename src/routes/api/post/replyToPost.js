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
exports.replyToPostRouter = void 0;
const express_1 = require("express");
const notificationsSchema_1 = __importDefault(require("../../../schemas/notificationsSchema"));
const postSchema_1 = __importDefault(require("../../../schemas/postSchema"));
const router = (0, express_1.Router)();
exports.replyToPostRouter = router;
router.post("/:id/reply", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    let post = yield postSchema_1.default.create({
        content: req.body.content,
        postedBy: req.session.user._id,
        replyTo: req.params.id,
    });
    post = yield post.populate([
        {
            path: "postedBy",
            select: "_id name profilePic firstName lastName username",
        },
        {
            path: "retweetData",
            populate: {
                path: "postedBy",
                select: "_id name profilePic firstName lastName username",
            },
        },
        {
            path: "replyTo",
            populate: {
                path: "postedBy",
                select: "_id name profilePic firstName lastName username",
            },
        },
    ]);
    if (post.replyTo) {
        yield notificationsSchema_1.default.insertNotification({
            userTo: post.replyTo.postedBy._id,
            userFrom: req.session.user._id,
            notificationType: "reply",
            entityId: post._id,
        });
    }
    res.status(200).json({
        status: "ok",
        data: post,
    });
}));
