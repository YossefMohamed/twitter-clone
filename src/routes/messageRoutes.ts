import { Request, Router } from "express";
import mongoose from "mongoose";
import Chat, { IChat } from "../schemas/chatSchema";
import { IUser } from "../schemas/userSchema";

const router = Router();
router.get("/", (req: Request, res, next) => {
  res.status(200).render("inboxPage", {
    pageTitle: "Inbox",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  });
});

router.get("/new", (req: Request, res, next) => {
  res.status(200).render("newMessage", {
    pageTitle: "New message",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  });
});

router.get("/:chatId", async (req: Request, res, next) => {
  if (!mongoose.isValidObjectId(req.params.chatId)) return res.redirect("/404");
  const userId = req.session.user?._id;
  const chatId = req.params.chatId;

  const payload: {
    pageTitle: string;
    userLoggedIn: IUser | undefined;
    userLoggedInJs: string;
    errorMessage?: string;
    chat?: IChat;
  } = {
    pageTitle: "Chat",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  };
  const chat = await Chat.findById(chatId);
  if (!chat) {
    payload.errorMessage = "404 not found";
    return res.status(200).render("chatPage", payload);
  }
  const isPart = chat.users.includes(userId);

  if (!isPart) {
    payload.errorMessage = "404 not found";
  } else {
    payload.chat = chat;
  }

  res.status(200).render("chatPage", payload);
});

export { router as messageRouter };
