import { NextFunction, Request, Response } from "express";

export const requireLogin = (req: any, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect(
      req.originalUrl === "/" ? "/" : `/login?red=${req.originalUrl}`
    );
  }
};
