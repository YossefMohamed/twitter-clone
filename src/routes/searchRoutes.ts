import { Router } from "express";
import { IUser } from "../schemas/userSchema";

const router = Router();
router.get("/", (req: any, res, next) => {
  const payload: any = createPayload(req.session.user);
  payload.selectedTab = "posts";

  res.status(200).render("searchPage", payload);
});

router.get("/:selectedTab", (req: any, res, next) => {
  const payload: any = createPayload(req.session.user);
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
