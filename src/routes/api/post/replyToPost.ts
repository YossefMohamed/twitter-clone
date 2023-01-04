import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import Post from "../../../schemas/postSchema";
import User from "../../../schemas/userSchema";

const router = Router();

router.post("/:id/reply", async (req: any, res, next) => {
  const { content } = req.body;
  let post = await Post.create({
    content: req.body.content,
    postedBy: req.session.user._id,
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
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

export { router as replyToPostRouter };
