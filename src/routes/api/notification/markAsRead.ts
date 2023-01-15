import { Router } from "express";
import Notification from "../../../schemas/notificationsSchema";

const router = Router();

router.get("/:id", async (req: any, res, next) => {
  const notifications = await Notification.findById(
    req.params.id,
    {
      opened: true,
    },
    {
      new: true,
    }
  )
    .populate("userTo")
    .populate("userFrom")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "ok",
    data: notifications,
  });
});

export { router as getNotifications };
