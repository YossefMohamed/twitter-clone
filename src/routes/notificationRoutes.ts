import { Request, Router } from "express";
import Chat from "../schemas/chatSchema";

const router = Router();

router.get("/", (req: Request, res, next) => {
  res.status(200).render("notificationsPage", {
    pageTitle: "Notifications",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  });
});

export { router as notificationRouter };
