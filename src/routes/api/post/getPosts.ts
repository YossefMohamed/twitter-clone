import { NextFunction, Request, Response, Router } from "express";
import Post from "../../../schemas/postSchema";
const router = Router();

router.get("/", async (req: any, res, next) => {
  const posts = !req.query.search
    ? await getPostsFunction(
        req.query.postedBy
          ? {
              postedBy: req.query.postedBy,
              replyTo:
                req.query.isReply === "true"
                  ? { $ne: null }
                  : {
                      $eq: null,
                    },
            }
          : {}
      )
    : await getPostsFunction({
        content: { $regex: req.query.search, $options: "i" },
      });

  res.status(200).json({
    status: "ok",
    data: posts,
  });
});

const getPostsFunction = async (filter: any = {}) => {
  return await Post.find(filter)
    .populate([
      {
        path: "replies",
        select: "_id",
      },
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
    ])
    .sort("createdAt");
};

export { router as getPostsRouter };
