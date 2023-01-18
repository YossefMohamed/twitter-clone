import { NextFunction, Request, Response, Router } from "express";
import mongoose from "mongoose";
import Notification from "../../../schemas/notificationsSchema";
import Post from "../../../schemas/postSchema";

const router = Router();

router.post("/:id/reply", async (req: Request, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({
      status: "failed",
      message: "Not Found",
    });
  const { content } = req.body;
  let post = await Post.create({
    content: req.body.content,
    postedBy: req.session.user?._id,
    replyTo: req.params.id,
  });
  post = await post.populate([
    {
      path: "postedBy",
      select: "_id name profilePic firstName lastName username",
    },
    {
      path: "retweetData",
      populate: {
        path: "postedBy",
        select: "_id name profilePic firstName lastName username",
      },
    },
    {
      path: "replyTo",
      populate: {
        path: "postedBy",
        select: "_id name profilePic firstName lastName username",
      },
    },
  ]);
  if (post.replyTo) {
    await Notification.insertNotification({
      userTo: post.replyTo.postedBy._id,
      userFrom: req.session.user?._id,
      notificationType: "reply",
      entityId: post._id,
    });
  }

  res.status(200).json({
    status: "ok",
    data: post,
  });
});

export { router as replyToPostRouter };
