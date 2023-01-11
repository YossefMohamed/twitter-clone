import { Router } from "express";
import Chat from "../schemas/chatSchema";

const router = Router();
router.get("/", (req: any, res, next) => {
  res.status(200).render("inboxPage", {
    pageTitle: "Inbox",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  });
});

router.get("/new", (req: any, res, next) => {
  res.status(200).render("newMessage", {
    pageTitle: "New message",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  });
});

router.get("/:chatId", async (req: any, res, next) => {
  const userId = req.session.user._id;
  const chatId = req.params.chatId;

  const payload: any = {
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
