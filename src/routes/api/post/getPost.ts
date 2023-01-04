import { NextFunction, Request, Response, Router } from "express";
import Post from "../../../schemas/postSchema";
const router = Router();

router.get("/:id", async (req: any, res, next) => {
  let post = await Post.findOne({
    _id: req.params.id,
  }).sort("createdAt");

  if (!post) {
    return res.status(404).json({
      status: "failed",
      message: "Post not found",
    });
  }

  const replies = await Post.find({
    replyTo: post._id,
  }).populate([
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
  const result = {
    post,
    replies,
  };

  res.status(200).json({
    status: "ok",
    data: result,
  });
});

export { router as getPostRouter };
