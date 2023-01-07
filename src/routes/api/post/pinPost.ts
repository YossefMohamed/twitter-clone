import { Router } from "express";
import Post from "../../../schemas/postSchema";

const router = Router();

router.patch("/:id/pin", async (req: any, res, next) => {
  await Post.updateMany(
    {
      postedBy: req.session.user._id,
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
  console.log(post, !post.pinned);

  post.pinned = post.pinned ? false : true;
  console.log(post.pinned);

  await post.save();
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

export { router as pinPostRouter };
