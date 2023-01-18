import { Request, Router } from "express";

const router = Router();

router.get("/", (req: Request, res, next) => {
  res.status(200).render("404");
});

export { router as notFoundRoutes };
