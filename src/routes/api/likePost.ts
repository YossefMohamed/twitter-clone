import { NextFunction, Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import Post from "../../schemas/postSchema";
import User from "../../schemas/userSchema";

const router = Router();

router.patch("/:id/like", async (req: any, res, next) => {
  const postId = req.params.id;
  const isLiked =
    req.session.user?.likes &&
    req.session.user.likes.map(
      (post: { _id: ObjectId }) => `${postId}` === `${post._id}`
    );

  const option = isLiked.includes(true) ? "$pull" : "$addToSet";
  const post = await Post.findByIdAndUpdate(
    new ObjectId(postId),
    {
      [option]: { likes: req.session.user._id },
    },
    {
      new: true,
    }
  );
  req.session.user = await User.findById(req.session.user._id);
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

export { router as likePostRouter };
