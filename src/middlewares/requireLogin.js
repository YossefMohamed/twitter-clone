"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireLogin = void 0;
const requireLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    else {
        return res.redirect(req.originalUrl === "/" ? "/" : `/login?red=${req.originalUrl}`);
    }
};
exports.requireLogin = requireLogin;
