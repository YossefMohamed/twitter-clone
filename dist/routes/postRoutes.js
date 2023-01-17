"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)({ mergeParams: true });
router.get("/", (req, res, next) => {
    const payload = {
        pageTitle: "Tweet",
        userLoggedIn: req.session.user,
        userLoggedInJs: JSON.stringify(req.session.user),
        postId: req.params.id,
    };
    res.status(200).render("post", payload);
});
exports.default = router;
