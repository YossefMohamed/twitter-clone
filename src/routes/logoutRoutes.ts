import { Router } from "express";

const router = Router();

router.get("/", (req: any, res) => {
  req.session.destroy();
  res.redirect("/");
});

export { router as logoutRoutes };
