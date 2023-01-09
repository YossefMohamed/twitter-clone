import { Router } from "express";
import mongoose from "mongoose";
import Chat from "../schemas/chatSchema";
import User from "../schemas/userSchema";

const router = Router();
router.get("/", (req: any, res, next) => {
  res.status(200).render("inboxPage", {
    pageTitle: "Inbox",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  });
});

router.get("/new", (req: any, res, next) => {
  res.status(200).render("newMessage", {
    pageTitle: "New message",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  });
});

router.get("/:chatId", async (req: any, res, next) => {
  var userId = req.session.user._id;
  var chatId = req.params.chatId;
  var isValidId = mongoose.isValidObjectId(chatId);

  var payload: any = {
    pageTitle: "Chat",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  };

  if (!isValidId) {
    payload.errorMessage =
      "Chat does not exist or you do not have permission to view it.";
    return res.status(200).render("chatPage", payload);
  }

  var chat = await Chat.findOne({
    _id: chatId,
    users: { $elemMatch: { $eq: userId } },
  }).populate("users");

  if (chat == null) {
    // Check if chat id is really user id
    var userFound = await User.findById(chatId);

    if (userFound != null) {
      // get chat using user id
      chat = await getChatByUserId(userFound._id, userId);
    }
  }

  if (chat == null) {
    payload.errorMessage =
      "Chat does not exist or you do not have permission to view it.";
  } else {
    payload.chat = chat;
  }

  res.status(200).render("chatPage", payload);
});

function getChatByUserId(userLoggedInId: any, otherUserId: any) {
  return Chat.findOneAndUpdate(
    {
      isGroupChat: false,
      users: {
        $size: 2,
        $all: [
          { $elemMatch: { $eq: userLoggedInId } },
          { $elemMatch: { $eq: otherUserId } },
        ],
      },
    },
    {
      $setOnInsert: {
        users: [userLoggedInId, otherUserId],
      },
    },
    {
      new: true,
      upsert: true,
    }
  ).populate("users");
}

export { router as messageRouter };
