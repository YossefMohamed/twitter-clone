import { Router } from "express";
import Notification from "../../../schemas/notificationsSchema";

const router = Router();

router.get("/", async (req: any, res, next) => {
  const notifications = await Notification.find({
    userTo: req.session.user._id,
    notificationType: { $ne: "newMessage" },
  })
    .populate("userTo")
    .populate("userFrom")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "ok",
    data: notifications,
  });
});

export { router as getNotifications };
