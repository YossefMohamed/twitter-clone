"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.logoutRoutes = router;
router.get("/", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});
