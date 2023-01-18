import { Request, Response, Router } from "express";
import mongoose from "mongoose";
import User, { IUser } from "../schemas/userSchema";
const router = Router();

export interface IPayload {
  pageTitle: string;
  userLoggedIn: IUser;
  userLoggedInJs: string;
  profileUser?: IUser;
  selectedTab?: string;
}

router.get("/", async (req: Request, res: Response) => {
  const user = await User.findOne({
    username: req.session.user?.username,
  }).populate("following");
  if (!user) return res.redirect("/login");
  const payload: IPayload = {
    pageTitle: user.username,
    userLoggedIn: user,
    userLoggedInJs: JSON.stringify(req.session.user),
    profileUser: user,
  };

  res.status(200).render("profilePage", payload);
});

router.get("/:username", async (req: Request, res: Response) => {
  const payload: IPayload = await getPayload(
    req.params.username,
    req.session.user
  );
  if (!payload.profileUser) return res.redirect("/404");

  res.status(200).render("profilePage", payload);
});

router.get("/:username/replies", async (req: Request, res: Response) => {
  const payload: IPayload = await getPayload(
    req.params.username,
    req.session.user
  );
  payload.selectedTab = "replies";

  res.status(200).render("profilePage", payload);
});

async function getPayload(username: string, userLoggedIn: any) {
  let user = await User.findOne({ username: username }).populate("following");

  if (user === null) {
    if (!mongoose.isValidObjectId(username)) {
      return {
        pageTitle: "User not found",
        userLoggedIn: userLoggedIn,
        userLoggedInJs: JSON.stringify(userLoggedIn),
      };
    }
    user = await User.findById(username).populate("following");

    if (user === null) {
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

router.get("/:username/following", async (req: Request, res, next) => {
  const payload: IPayload = await getPayload(
    req.params.username,
    req.session.user
  );
  payload.selectedTab = "following";

  res.status(200).render("followersAndFollowing", payload);
});

router.get("/:username/followers", async (req: Request, res, next) => {
  const payload: IPayload = await getPayload(
    req.params.username,
    req.session.user
  );
  payload.selectedTab = "followers";

  res.status(200).render("followersAndFollowing", payload);
});

export { router as profileRoutes };
