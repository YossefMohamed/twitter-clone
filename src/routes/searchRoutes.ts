import { Request, Router } from "express";
import { IUser } from "../schemas/userSchema";
import { IPayload } from "./profileRoutes";

const router = Router();
router.get("/", (req: Request, res, next) => {
  const payload: IPayload = createPayload(req.session.user!);
  payload.selectedTab = "posts";

  res.status(200).render("searchPage", payload);
});

router.get("/:selectedTab", (req: Request, res, next) => {
  const payload: IPayload = createPayload(req.session.user!);
  payload.selectedTab = req.params.selectedTab;
  res.status(200).render("searchPage", payload);
});

function createPayload(userLoggedIn: IUser) {
  return {
    pageTitle: "Search",
    userLoggedIn: userLoggedIn,
    userLoggedInJs: JSON.stringify(userLoggedIn),
  };
}

export { router as searchRoutes };
