import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Notification from "../../../schemas/notificationsSchema";
import Post, { IPost } from "../../../schemas/postSchema";
import User from "../../../schemas/userSchema";

const router = Router();

router.post("/:id/retweet", async (req: Request, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({
      status: "failed",
      message: "Not Found",
    });
  try {
    const postId = req.params.id;
    const userId = req.session.user?._id;

    // try and delete retweet
    const deletedPost = await Post.findOneAndDelete({
      postedBy: userId,
      retweetData: postId,
    });
    const isLiked =
      req.session.user?.likes &&
      req.session.user.likes
        .map((post: { _id: ObjectId }) => `${postId}` === `${post._id}`)
        .includes(true);

    const option = deletedPost !== null ? "$pull" : "$addToSet";

    let repost: any = deletedPost;

    if (repost === null) {
      repost = await Post.create({
        postedBy: userId,
        retweetData: postId,
      });
    }

    let post = await Post.findByIdAndUpdate(
      new ObjectId(postId),
      {
        [option]: { retweetUsers: userId },
      },
      {
        new: true,
      }
    );

    if (option === "$addToSet" && post) {
      await Notification.insertNotification({
        userTo: post.postedBy,
        userFrom: req.session.user?._id,
        notificationType: "retweet",
        entityId: post._id,
      });
    }

    req.session.user =
      (await User.findById(req.session.user?._id)) || req.session.user;

    return res.status(200).json({
      status: "ok",
      data: post,
    });
  } catch (error: any) {
    res.status(404).json({
      status: "failed",
      error: "Not found",
    });
  }
});

export { router as retweetPostRouter };
