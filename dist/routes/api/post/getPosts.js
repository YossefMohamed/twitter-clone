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
exports.getPostsRouter = void 0;
const express_1 = require("express");
const postSchema_1 = __importDefault(require("../../../schemas/postSchema"));
const router = (0, express_1.Router)();
exports.getPostsRouter = router;
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = !req.query.search
        ? yield getPostsFunction(req.query.postedBy
            ? {
                postedBy: req.query.postedBy,
                replyTo: req.query.isReply === "true"
                    ? { $ne: null }
                    : {
                        $eq: null,
                    },
            }
            : {})
        : yield getPostsFunction({
            content: { $regex: req.query.search, $options: "i" },
        });
    res.status(200).json({
        status: "ok",
        data: posts,
    });
}));
const getPostsFunction = (filter = {}) => __awaiter(void 0, void 0, void 0, function* () {
    return yield postSchema_1.default.find(filter)
        .populate([
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
    ])
        .sort("createdAt");
});
