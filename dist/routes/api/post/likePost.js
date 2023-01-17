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
exports.likePostRouter = void 0;
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const notificationsSchema_1 = __importDefault(require("../../../schemas/notificationsSchema"));
const postSchema_1 = __importDefault(require("../../../schemas/postSchema"));
const userSchema_1 = __importDefault(require("../../../schemas/userSchema"));
const router = (0, express_1.Router)();
exports.likePostRouter = router;
router.patch("/:id/like", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const postId = req.params.id;
    const isLiked = ((_a = req.session.user) === null || _a === void 0 ? void 0 : _a.likes) &&
        req.session.user.likes.map((post) => `${postId}` === `${post._id}`);
    const option = isLiked
        ? isLiked.includes(true)
            ? "$pull"
            : "$addToSet"
        : "$addToSet";
    const post = yield postSchema_1.default.findByIdAndUpdate(new mongodb_1.ObjectId(postId), {
        [option]: { likes: req.session.user._id },
    }, {
        new: true,
    });
    if (option === "$addToSet" && post) {
        yield notificationsSchema_1.default.insertNotification({
            userTo: post.postedBy,
            userFrom: req.session.user._id,
            notificationType: "postLike",
            entityId: post._id,
        });
    }
    req.session.user = yield userSchema_1.default.findById(req.session.user._id);
    res.status(200).json({
        status: "ok",
        data: post,
    });
}));
