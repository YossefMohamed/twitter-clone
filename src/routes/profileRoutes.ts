import { Router } from "express";
import User from "../schemas/userSchema";
const router = Router();
router.get("/", async (req: any, res: any, next: any) => {
  let user = await User.findOne({
    username: req.session.user.username,
  }).populate("following");
  const payload = {
    pageTitle: req.session.user.username,
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
    profileUser: user,
  };

  res.status(200).render("profilePage", payload);
});

router.get("/:username", async (req: any, res: any, next: any) => {
  const payload = await getPayload(req.params.username, req.session.user);

  res.status(200).render("profilePage", payload);
});

router.get("/:username/replies", async (req: any, res: any, next: any) => {
  const payload: any = await getPayload(req.params.username, req.session.user);
  payload.selectedTab = "replies";

  res.status(200).render("profilePage", payload);
});

async function getPayload(username: string, userLoggedIn: any) {
  let user = await User.findOne({ username: username }).populate("following");

  if (user == null) {
    user = await User.findById(username).populate("following");

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

router.get("/:username/following", async (req: any, res, next) => {
  const payload: any = await getPayload(req.params.username, req.session.user);
  payload.selectedTab = "following";

  res.status(200).render("followersAndFollowing", payload);
});

router.get("/:username/followers", async (req: any, res, next) => {
  const payload: any = await getPayload(req.params.username, req.session.user);
  payload.selectedTab = "followers";

  res.status(200).render("followersAndFollowing", payload);
});

export { router as profileRoutes };
