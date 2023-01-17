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
exports.getUsersRouter = void 0;
const express_1 = require("express");
const userSchema_1 = __importDefault(require("../../../schemas/userSchema"));
const router = (0, express_1.Router)();
exports.getUsersRouter = router;
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let searchObj = {};
        if (req.query.search !== undefined) {
            searchObj = {
                $or: [
                    { firstName: { $regex: req.query.search, $options: "i" } },
                    { lastName: { $regex: req.query.search, $options: "i" } },
                    { username: { $regex: req.query.search, $options: "i" } },
                ],
            };
        }
        const users = yield userSchema_1.default.find(searchObj);
        res.status(200).json({
            status: "ok",
            data: users,
        });
    }
    catch (error) {
        res.sendStatus(400);
    }
}));
