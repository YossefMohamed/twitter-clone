import { Router } from "express";
import { ObjectId } from "mongodb";
import Message from "../../../schemas/messageSchema";

const router = Router();

router.get("/:id", async (req: any, res, next) => {
  const messages = await Message.find({
    chat: req.params.id,
  }).populate("sender");
  await Message.updateMany(
    {
      chat: req.params.id,
    },
    {
      $addToSet: { readBy: req.session.user._id },
    }
  );
  res.status(200).json({
    status: "ok",
    data: messages,
  });
});

export { router as getMessagesByChat };
