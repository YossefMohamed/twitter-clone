import { Router } from "express";
import { createPostsRouter } from "./post/addPost";
import { getPostRouter } from "./post/getPosts";
import { likePostRouter } from "./post/likePost";
import { retweetPostRouter } from "./post/retweetPost";

const router = Router();

router.use("/post", createPostsRouter);
router.use("/post", getPostRouter);
router.use("/post", likePostRouter);
router.use("/post", retweetPostRouter);

export { router as ApiRouter };
