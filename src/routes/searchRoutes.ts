import { Router } from "express";
import { IUser } from "../schemas/userSchema";

const router = Router();
router.get("/", (req: any, res, next) => {
  var payload = createPayload(req.session.user);
  res.status(200).render("searchPage", payload);
});

router.get("/:selectedTab", (req: any, res, next) => {
  var payload: any = createPayload(req.session.user);
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
