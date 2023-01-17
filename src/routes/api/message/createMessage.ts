import { Router } from "express";
import Chat, { IChat } from "../../../schemas/chatSchema";
import Message, { IMessage } from "../../../schemas/messageSchema";
import Notification from "../../../schemas/notificationsSchema";

const router = Router();

router.post("/", async (req: any, res, next) => {
  const { content, chat } = req.body;

  if (!(content && chat)) {
    return res.status(400).json({
      status: "failed",
      message: "data not completed",
    });
  }
  let message = await Message.create({
    sender: req.session.user._id,
    content,
    chat,
    readBy: [req.session.user._id],
  });

  message = await message.populate([
    {
      path: "chat",
      populate: {
        path: "users",
      },
    },
    {
      path: "sender",
    },
  ]);
  await Chat.findByIdAndUpdate(chat, {
    latestMessage: message,
  });

  await sendToUsersInTheChat(message.chat, message);

  res.status(200).json({
    status: "ok",
    data: message,
  });
});

const sendToUsersInTheChat = async (chat: IChat, message: IMessage) => {
  chat.users.forEach(async (userId) => {
    if (userId == message.sender._id.toString()) return;

    await Notification.insertNotification({
      userTo: userId,
      userFrom: message.sender._id,
      notificationType: "newMessage",
      entityId: message.chat._id,
    });
  });
};

export { router as createMessageRouter };

// {
//     sender: { type: Schema.Types.ObjectId, ref: "User" },
//     content: { type: String, trim: true },
//     chat: { type: Schema.Types.ObjectId, ref: "Chat" },
//     readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
//   }
