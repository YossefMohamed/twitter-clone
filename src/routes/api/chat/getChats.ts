import { Router } from "express";
import Chat from "../../../schemas/chatSchema";

const router = Router();

router.get("/", async (req: any, res, next) => {
  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.session.user._id } },
  })
    .populate("users")
    .sort({ updatedAt: -1 });

  res.status(200).json({
    status: "ok",
    data: chats,
  });
});

export { router as getChatsRouter };
