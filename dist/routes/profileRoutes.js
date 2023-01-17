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
exports.profileRoutes = void 0;
const express_1 = require("express");
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const router = (0, express_1.Router)();
exports.profileRoutes = router;
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userSchema_1.default.findOne({
        username: req.session.user.username,
    }).populate("following");
    const payload = {
        pageTitle: req.session.user.username,
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        profileUser: user,
    };
    res.status(200).render("profilePage", payload);
}));
router.get("/:username", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = yield getPayload(req.params.username, req.session.user);
    res.status(200).render("profilePage", payload);
}));
router.get("/:username/replies", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = yield getPayload(req.params.username, req.session.user);
    payload.selectedTab = "replies";
    res.status(200).render("profilePage", payload);
}));
function getPayload(username, userLoggedIn) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield userSchema_1.default.findOne({ username: username }).populate("following");
        if (user == null) {
            user = yield userSchema_1.default.findById(username).populate("following");
            if (user == null) {
                return {
                    pageTitle: "User not found",
                    userLoggedIn: userLoggedIn,
                    userLoggedInJs: JSON.stringify(userLoggedIn),
                };
            }
        }
        return {
            pageTitle: user.username,
            userLoggedIn: userLoggedIn,
            userLoggedInJs: JSON.stringify(userLoggedIn),
            profileUser: user,
        };
    });
}
router.get("/:username/following", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = yield getPayload(req.params.username, req.session.user);
    payload.selectedTab = "following";
    res.status(200).render("followersAndFollowing", payload);
}));
router.get("/:username/followers", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = yield getPayload(req.params.username, req.session.user);
    payload.selectedTab = "followers";
    res.status(200).render("followersAndFollowing", payload);
}));
