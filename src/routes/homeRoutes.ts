import { Request, Router } from "express";

const router = Router();

router.get("/", (req: Request, res, next) => {
  const payload = {
    pageTitle: "Home",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  };

  res.status(200).render("home", payload);
});

export { router as HomeRoutes };
