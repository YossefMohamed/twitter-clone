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
exports.followUserRouter = void 0;
const express_1 = require("express");
const mongodb_1 = require("mongodb");
const notificationsSchema_1 = __importDefault(require("../../../schemas/notificationsSchema"));
const userSchema_1 = __importDefault(require("../../../schemas/userSchema"));
const router = (0, express_1.Router)();
exports.followUserRouter = router;
router.post("/:id/follow", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.default.findById(req.session.user._id);
        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "User Not Found",
            });
        }
        if (user.following && user.following.length) {
            if (user.following.map((userId) => {
                return new mongodb_1.ObjectId(req.params.id).equals(userId);
            }).length) {
                user.following = user.following.filter(function (userId) {
                    return !new mongodb_1.ObjectId(req.params.id).equals(userId);
                });
            }
            else {
                user.following = [...user.following, req.params.id];
                yield notificationsSchema_1.default.insertNotification({
                    userTo: req.params.id,
                    userFrom: req.session.user._id,
                    notificationType: "follow",
                    entityId: req.session.user._id,
                });
            }
        }
        else {
            user.following = [req.params.id];
            yield notificationsSchema_1.default.insertNotification({
                userTo: req.params.id,
                userFrom: req.session.user._id,
                notificationType: "follow",
                entityId: req.session.user._id,
            });
        }
        yield user.save();
        res.status(200).json({
            status: "ok",
            data: user,
        });
    }
    catch (error) {
        console.log(error.message);
    }
}));
