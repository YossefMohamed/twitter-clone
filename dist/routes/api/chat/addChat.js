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
exports.addChatRouter = void 0;
const express_1 = require("express");
const chatSchema_1 = __importDefault(require("../../../schemas/chatSchema"));
const router = (0, express_1.Router)();
exports.addChatRouter = router;
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.users) {
        return res.status(400);
    }
    const users = req.body.users;
    if (users.length == 0) {
        return res.status(400);
    }
    users.push(req.session.user);
    const chatData = {
        users: users,
        isGroupChat: users.length > 2 ? true : false,
    };
    let chat = null;
    if (users.length === 2) {
        chat = yield chatSchema_1.default.findOne({
            users: users,
        });
    }
    if (!chat) {
        chat = yield chatSchema_1.default.create(chatData);
    }
    res.status(200).json({
        status: "ok",
        data: chat,
    });
}));
