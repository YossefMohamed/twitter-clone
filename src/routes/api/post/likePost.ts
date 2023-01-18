import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Notification from "../../../schemas/notificationsSchema";
import Post from "../../../schemas/postSchema";
import User from "../../../schemas/userSchema";

const router = Router();

router.patch("/:id/like", async (req: Request, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({
      status: "failed",
      message: "Not Found",
    });
  const postId = req.params.id;

  const isLiked =
    req.session.user?.likes &&
    req.session.user.likes.map(
      (post: { _id: ObjectId }) => `${postId}` === `${post._id}`
    );

  const option = isLiked
    ? isLiked.includes(true)
      ? "$pull"
      : "$addToSet"
    : "$addToSet";
  const post = await Post.findByIdAndUpdate(
    new ObjectId(postId),
    {
      [option]: { likes: req.session.user?._id },
    },
    {
      new: true,
    }
  );

  if (option === "$addToSet" && post) {
    await Notification.insertNotification({
      userTo: post.postedBy,
      userFrom: req.session.user?._id,
      notificationType: "postLike",
      entityId: post._id,
    });
  }
  req.session.user =
    (await User.findById(req.session.user?._id)) || req.session.user;
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

export { router as likePostRouter };
