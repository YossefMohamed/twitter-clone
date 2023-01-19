import { Router, Request } from "express";
import Chat, { IChat } from "../../../schemas/chatSchema";

const router = Router();

router.post("/", async (req: Request, res, next) => {
  if (!req.body.users) {
    return res.status(400);
  }

  const users = req.body.users;

  if (users.length == 0) {
    return res.status(400);
  }

  users.push(req.session.user);

  const chatData = {
    users: users,
    isGroupChat: users.length > 2 ? true : false,
  };
  let chat: IChat | null = null;
  if (users.length === 2) {
    chat = await Chat.findOne({
      users: users,
    });
  }

  if (!chat) {
    chat = await Chat.create(chatData);
  }

  res.status(200).json({
    status: "ok",
    data: chat,
  });
});

export { router as addChatRouter };
