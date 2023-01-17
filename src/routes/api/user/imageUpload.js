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
exports.uploadImageRouter = void 0;
const express_1 = require("express");
const multerUploader_1 = require("../../../middlewares/multerUploader");
const userSchema_1 = __importDefault(require("../../../schemas/userSchema"));
const router = (0, express_1.Router)();
exports.uploadImageRouter = router;
router.post("/upload", multerUploader_1.upload.single("filePhoto"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body.type === "profile"
        ? yield userSchema_1.default.findByIdAndUpdate(req.session.user, {
            profilePic: req.file.filename,
        }, {
            new: true,
        })
        : yield userSchema_1.default.findByIdAndUpdate(req.session.user, {
            coverPic: req.file.filename,
        }, {
            new: true,
        });
    req.session.user = user;
    res.status(200).json({
        status: "ok",
        data: user,
    });
}));
