import { Request, Router } from "express";
import mongoose from "mongoose";
import Chat from "../../../schemas/chatSchema";

const router = Router();

router.patch("/:id", async (req: Request, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({
      status: "failed",
      message: "Not Found",
    });
  const chat = await Chat.findOne({
    _id: req.params.id,
    users: { $in: [req.session.user?._id] },
  }).populate("users");
  if (!chat)
    return res.status(404).json({
      status: "failed",
      message: "Chat not found!",
    });

  chat.chatName = req.body.name;
  await chat.save();
  res.status(200).json({
    status: "ok",
    data: chat,
  });
});

export { router as changeChatNameRouter };
