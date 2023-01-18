import { NextFunction, Request, Response } from "express";

export const requireLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.redirect(`/login?red=${req.originalUrl}`);
  }
};
