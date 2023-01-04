import { NextFunction, Request, Response, Router } from "express";
import Post from "../../../schemas/postSchema";

const router = Router();

router.post("/", async (req: any, res, next) => {
  try {
    if (!req.body.content) {
      return res.status(400).json({
        status: "failed",
        message: "Content Is Not Vaild",
      });
    }
    let post = await Post.create({
      content: req.body.content,
      postedBy: req.session.user._id,
    });
    post = await post.populate("postedBy");
    res.status(200).json({
      status: "ok",
      data: post,
    });
  } catch (error: any) {
    console.log(error.message);
  }
});

export { router as createPostsRouter };
