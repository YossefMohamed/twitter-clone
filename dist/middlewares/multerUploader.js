"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
exports.upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: "public/images",
        filename: function (req, file, cb) {
            cb(null, req.session.user._id + Date.now() + "." + "png");
        },
    }),
});
