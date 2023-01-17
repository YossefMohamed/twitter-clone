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
exports.createPostsRouter = void 0;
const express_1 = require("express");
const postSchema_1 = __importDefault(require("../../../schemas/postSchema"));
const router = (0, express_1.Router)();
exports.createPostsRouter = router;
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.content) {
            return res.status(400).json({
                status: "failed",
                message: "Content Is Not Vaild",
            });
        }
        let post = yield postSchema_1.default.create({
            content: req.body.content,
            postedBy: req.session.user._id,
        });
        post = yield post.populate("postedBy");
        res.status(200).json({
            status: "ok",
            data: post,
        });
    }
    catch (error) {
        console.log(error.message);
    }
}));
