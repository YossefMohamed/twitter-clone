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
exports.messageRouter = void 0;
const express_1 = require("express");
const chatSchema_1 = __importDefault(require("../schemas/chatSchema"));
const router = (0, express_1.Router)();
exports.messageRouter = router;
router.get("/", (req, res, next) => {
    res.status(200).render("inboxPage", {
        pageTitle: "Inbox",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    });
});
router.get("/new", (req, res, next) => {
    res.status(200).render("newMessage", {
        pageTitle: "New message",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    });
});
router.get("/:chatId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.session.user._id;
    const chatId = req.params.chatId;
    const payload = {
        pageTitle: "Chat",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    };
    const chat = yield chatSchema_1.default.findById(chatId);
    if (!chat) {
        payload.errorMessage = "404 not found";
        return res.status(200).render("chatPage", payload);
    }
    const isPart = chat.users.includes(userId);
    if (!isPart) {
        payload.errorMessage = "404 not found";
    }
    else {
        payload.chat = chat;
    }
    res.status(200).render("chatPage", payload);
}));
