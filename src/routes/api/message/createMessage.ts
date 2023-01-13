import { Router } from "express";
import Chat from "../../../schemas/chatSchema";
import Message from "../../../schemas/messageSchema";

const router = Router();

router.post("/", async (req: any, res, next) => {
  const { content, chat } = req.body;

  if (!(content && chat)) {
    return res.status(400).json({
      status: "failed",
      message: "data not completed",
    });
  }
  const message = await Message.create({
    sender: req.session.user._id,
    content,
    chat,
  });
  await Chat.findByIdAndUpdate(chat, {
    latestMessage: message,
  });
  res.status(200).json({
    status: "ok",
    data: message,
  });
});

export { router as createMessageRouter };

// {
//     sender: { type: Schema.Types.ObjectId, ref: "User" },
//     content: { type: String, trim: true },
//     chat: { type: Schema.Types.ObjectId, ref: "Chat" },
//     readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
//   }
