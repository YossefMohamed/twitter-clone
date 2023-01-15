import { Router } from "express";
import { ObjectId } from "mongodb";
import Notification from "../../../schemas/notificationsSchema";

const router = Router();

router.patch("/", async (req: any, res, next) => {
  const notifications = await Notification.updateMany(
    {
      userTo: new ObjectId(req.session.user._id),
    },
    {
      opened: true,
    }
  );

  res.status(200).json({
    status: "ok",
    data: notifications,
  });
});

export { router as markAllAsReadNotification };
