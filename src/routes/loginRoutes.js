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
const express_1 = require("express");
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.get("/", (req, res, next) => {
    res.status(200).render("login");
});
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    if (req.body.logUsername && req.body.logPassword) {
        const user = yield userSchema_1.default.findOne({
            $or: [
                { username: req.body.logUsername },
                { email: req.body.logUsername },
            ],
        }).catch((error) => {
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("login", payload);
        });
        if (user != null) {
            const result = yield bcrypt_1.default.compare(req.body.logPassword, user.password);
            if (result === true) {
                req.session.user = user;
                return res.redirect(req.query.red ? req.query.red : "/");
            }
        }
        payload.errorMessage = "Login credentials incorrect.";
        return res.status(200).render("login", payload);
    }
    payload.errorMessage = "Make sure each field has a valid value.";
    res.status(200).render("login");
}));
exports.default = router;
