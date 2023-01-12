import { Router } from "express";
import Message from "../../../schemas/messageSchema";

const router = Router();

router.get("/:id", async (req: any, res, next) => {
  const messages = await Message.find({
    chat: req.params.id,
  }).populate("users");

  res.status(200).json({
    status: "ok",
    data: messages,
  });
});

export { router as getMessagesByChat };
