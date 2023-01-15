import { Router } from "express";
import { ObjectId } from "mongodb";
import Notification from "../../../schemas/notificationsSchema";

const router = Router();

router.patch("/:id", async (req: any, res, next) => {
  console.log(req.params.id);

  const notification = await Notification.findByIdAndUpdate(
    new ObjectId(req.params.id),
    {
      opened: true,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "ok",
    data: notification,
  });
});

export { router as markAsReadNotification };
