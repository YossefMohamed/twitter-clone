import { Request, Router } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Notification from "../../../schemas/notificationsSchema";

const router = Router();

router.patch("/:id", async (req: Request, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({
      status: "failed",
      message: "Not Found",
    });
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
