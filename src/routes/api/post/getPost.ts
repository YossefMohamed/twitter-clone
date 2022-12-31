import { NextFunction, Request, Response, Router } from "express";
import Post from "../../../schemas/postSchema";
const router = Router();

router.get("/:id", async (req: any, res, next) => {
  const posts = await Post.findOne({
    _id: req.params.id,
  })
    .populate([
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
    ])
    .sort("createdAt");

  res.status(200).json({
    status: "ok",
    data: posts,
  });
});

export { router as getPostRouter };
