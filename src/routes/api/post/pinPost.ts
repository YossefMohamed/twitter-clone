import { Request, Router } from "express";
import mongoose from "mongoose";
import Post from "../../../schemas/postSchema";

const router = Router();

router.patch("/:id/pin", async (req: Request, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id))
    return res.status(404).json({
      status: "failed",
      message: "Not Found",
    });
  await Post.updateMany(
    {
      postedBy: req.session.user?._id,
      _id: { $ne: req.params.id },
    },
    {
      pinned: false,
    }
  );
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      status: "failed",
      message: "Post not found",
    });
  }

  post.pinned = post.pinned ? false : true;

  await post.save();
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

export { router as pinPostRouter };
