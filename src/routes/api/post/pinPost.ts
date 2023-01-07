import { Router } from "express";
import Post from "../../../schemas/postSchema";

const router = Router();

router.post("/:id/pin", async (req: any, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    pinned: true,
  });
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

export { router as pinPostRouter };
