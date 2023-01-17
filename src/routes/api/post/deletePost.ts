import { NextFunction, Request, Response, Router } from "express";
import Post from "../../../schemas/postSchema";
const router = Router();

router.delete("/:id", async (req: any, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.postedBy === req.session.user) {
    return res.status(404).json({
      status: "failed",
      message: "Post is not found",
    });
  }

  await post.remove();
  res.status(204).json({
    status: "ok",
    data: post,
  });
});

export { router as deletePostRouter };
