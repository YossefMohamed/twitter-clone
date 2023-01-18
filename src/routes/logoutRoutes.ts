import { Request, Router } from "express";

const router = Router();

router.get("/", (req: Request, res) => {
  req.session.destroy((err) => {
    res.redirect("/"); // will always fire after session is destroyed
  });
});

export { router as logoutRoutes };
