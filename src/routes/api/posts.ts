import { NextFunction, Request, Response, Router } from "express";
import Post from "../../schemas/postSchema";

const router = Router();

router.post("/post", async (req: any, res, next) => {
  if (!req.body.content) {
    return res.status(400).json({
      status: "failed",
      message: "Content Is Not Vaild",
    });
  }
  let post = await Post.create({
    content: req.body.content,
    postedBy: req.session.user,
  });
  post = await post.populate("postedBy");
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

export { router as postRouter };
