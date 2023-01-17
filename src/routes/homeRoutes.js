"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.HomeRoutes = router;
router.get("/", (req, res, next) => {
    const payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
    };
    res.status(200).render("home", payload);
});
