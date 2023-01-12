import { Router } from "express";
import Chat from "../../../schemas/chatSchema";

const router = Router();

router.get("/:id", async (req: any, res, next) => {
  const messages = await Chat.find({
    chat: req.params.id,
  }).populate("users");

  res.status(200).json({
    status: "ok",
    data: messages,
  });
});

export { router as getMessagesByChat };
