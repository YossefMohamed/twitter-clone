"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.searchRoutes = router;
router.get("/", (req, res, next) => {
    const payload = createPayload(req.session.user);
    payload.selectedTab = "posts";
    res.status(200).render("searchPage", payload);
});
router.get("/:selectedTab", (req, res, next) => {
    const payload = createPayload(req.session.user);
    payload.selectedTab = req.params.selectedTab;
    res.status(200).render("searchPage", payload);
});
function createPayload(userLoggedIn) {
    return {
        pageTitle: "Search",
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn),
    };
}
