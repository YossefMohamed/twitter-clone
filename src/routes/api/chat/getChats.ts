import { Router } from "express";
import Chat from "../../../schemas/chatSchema";

const router = Router();

router.get("/", async (req: any, res, next) => {
  const chats = await Chat.find({
    users: { $elemMatch: req.session.user },
  });
  res.status(200).json({
    status: "ok",
    data: chats,
  });
});

export { router as getChatsRouter };
