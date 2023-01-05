import { Router } from "express";
import User from "../schemas/userSchema";
const router = Router();
router.get("/", (req: any, res: any, next: any) => {
  var payload = {
    pageTitle: req.session.user.username,
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
    profileUser: req.session.user,
  };

  res.status(200).render("profilePage", payload);
});

router.get("/:username", async (req: any, res: any, next: any) => {
  var payload = await getPayload(req.params.username, req.session.user);

  res.status(200).render("profilePage", payload);
});

router.get("/:username/replies", async (req: any, res: any, next: any) => {
  var payload: any = await getPayload(req.params.username, req.session.user);
  payload.selectedTab = "replies";

  res.status(200).render("profilePage", payload);
});

async function getPayload(username: string, userLoggedIn: any) {
  var user = await User.findOne({ username: username });

  if (user == null) {
    user = await User.findById(username);

    if (user == null) {
      return {
        pageTitle: "User not found",
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn),
      };
    }
  }

  return {
    pageTitle: user.username,
    userLoggedIn: userLoggedIn,
    userLoggedInJs: JSON.stringify(userLoggedIn),
    profileUser: user,
  };
}

export { router as profileRoutes };
