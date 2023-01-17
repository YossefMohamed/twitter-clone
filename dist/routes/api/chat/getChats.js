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
exports.getChatsRouter = void 0;
const express_1 = require("express");
const chatSchema_1 = __importDefault(require("../../../schemas/chatSchema"));
const router = (0, express_1.Router)();
exports.getChatsRouter = router;
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chatSchema_1.default.find({
        users: { $elemMatch: { $eq: req.session.user._id } },
    })
        .populate([
        {
            path: "users",
        },
        {
            path: "latestMessage",
            select: "content readBy",
        },
    ])
        .sort({ updatedAt: -1 });
    res.status(200).json({
        status: "ok",
        data: chats,
    });
}));
