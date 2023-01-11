import { Router } from "express";
import Chat from "../../../schemas/chatSchema";

const router = Router();

router.post("/", async (req: any, res, next) => {
  if (!req.body.users) {
    console.log("Users param not sent with request");
    return res.status(400);
  }

  const users = req.body.users;

  if (users.length == 0) {
    console.log("Users array is empty");
    return res.status(400);
  }

  users.push(req.session.user);

  const chatData = {
    users: users,
    isGroupChat: users.length > 1 ? true : false,
  };

  const chat = await Chat.create(chatData);

  res.status(200).json({
    status: "ok",
    chat,
  });
});
