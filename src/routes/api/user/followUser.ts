import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import Notification from "../../../schemas/notificationsSchema";
import User from "../../../schemas/userSchema";

const router = Router();

router.post("/:id/follow", async (req: any, res, next) => {
  try {
    const user = await User.findById(req.session.user._id);

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User Not Found",
      });
    }

    if (user.following && user.following.length) {
      if (
        user.following.map((userId) => {
          return new ObjectId(req.params.id).equals(userId);
        }).length
      ) {
        user.following = user.following.filter(function (userId) {
          return !new ObjectId(req.params.id).equals(userId);
        });
      } else {
        user.following = [...user.following, req.params.id];
        await Notification.insertNotification({
          userTo: req.params.id,
          userFrom: req.session.user._id,
          notificationType: "follow",
          entityId: req.session.user._id,
        });
      }
    } else {
      user.following = [req.params.id];
      await Notification.insertNotification({
        userTo: req.params.id,
        userFrom: req.session.user._id,
        notificationType: "follow",
        entityId: req.session.user._id,
      });
    }

    await user.save();

    res.status(200).json({
      status: "ok",
      data: user,
    });
  } catch (error: any) {
    console.log(error.message);
  }
});

export { router as followUserRouter };
