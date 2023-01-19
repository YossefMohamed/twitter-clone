import { Request, Router } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Message from "../../../schemas/messageSchema";

const router = Router();

router.get("/:id", async (req: Request, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({
      status: "failed",
      message: "Not Found",
    });
  const messages = await Message.find({
    chat: req.params.id,
  }).populate("sender");
  await Message.updateMany(
    {
      chat: req.params.id,
    },
    {
      $addToSet: { readBy: req.session.user?._id },
    }
  );
  res.status(200).json({
    status: "ok",
    data: messages,
  });
});

export { router as getMessagesByChat };
