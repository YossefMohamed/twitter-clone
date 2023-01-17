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
exports.createMessageRouter = void 0;
const express_1 = require("express");
const chatSchema_1 = __importDefault(require("../../../schemas/chatSchema"));
const messageSchema_1 = __importDefault(require("../../../schemas/messageSchema"));
const notificationsSchema_1 = __importDefault(require("../../../schemas/notificationsSchema"));
const router = (0, express_1.Router)();
exports.createMessageRouter = router;
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, chat } = req.body;
    if (!(content && chat)) {
        return res.status(400).json({
            status: "failed",
            message: "data not completed",
        });
    }
    let message = yield messageSchema_1.default.create({
        sender: req.session.user._id,
        content,
        chat,
        readBy: [req.session.user._id],
    });
    message = yield message.populate([
        {
            path: "chat",
            populate: {
                path: "users",
            },
        },
        {
            path: "sender",
        },
    ]);
    yield chatSchema_1.default.findByIdAndUpdate(chat, {
        latestMessage: message,
    });
    yield sendToUsersInTheChat(message.chat, message);
    res.status(200).json({
        status: "ok",
        data: message,
    });
}));
const sendToUsersInTheChat = (chat, message) => __awaiter(void 0, void 0, void 0, function* () {
    chat.users.forEach((userId) => __awaiter(void 0, void 0, void 0, function* () {
        if (userId == message.sender._id.toString())
            return;
        yield notificationsSchema_1.default.insertNotification({
            userTo: userId,
            userFrom: message.sender._id,
            notificationType: "newMessage",
            entityId: message.chat._id,
        });
    }));
});
// {
//     sender: { type: Schema.Types.ObjectId, ref: "User" },
//     content: { type: String, trim: true },
//     chat: { type: Schema.Types.ObjectId, ref: "Chat" },
//     readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
//   }
