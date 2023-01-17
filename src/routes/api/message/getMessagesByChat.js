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
exports.getMessagesByChat = void 0;
const express_1 = require("express");
const messageSchema_1 = __importDefault(require("../../../schemas/messageSchema"));
const router = (0, express_1.Router)();
exports.getMessagesByChat = router;
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const messages = yield messageSchema_1.default.find({
        chat: req.params.id,
    }).populate("sender");
    yield messageSchema_1.default.updateMany({
        chat: req.params.id,
    }, {
        $addToSet: { readBy: req.session.user._id },
    });
    res.status(200).json({
        status: "ok",
        data: messages,
    });
}));
