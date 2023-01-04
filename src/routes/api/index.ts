import { Router } from "express";
import { createPostsRouter } from "./post/addPost";
import { getPostRouter } from "./post/getPost";
import { getPostsRouter } from "./post/getPosts";
import { likePostRouter } from "./post/likePost";
import { replyToPostRouter } from "./post/replyToPost";
import { retweetPostRouter } from "./post/retweetPost";

const router = Router();
router.use("/posts", createPostsRouter);
router.use("/posts", getPostsRouter);
router.use("/posts", likePostRouter);
router.use("/posts", retweetPostRouter);
router.use("/posts", getPostRouter);
router.use("/posts", replyToPostRouter);

export { router as ApiRouter };
