import { Router } from "express";
import { createPostsRouter } from "./addPost";
import { getPostRouter } from "./getPosts";
import { likePostRouter } from "./likePost";

const router = Router();

router.use("/post", createPostsRouter);
router.use("/post", getPostRouter);
router.use("/post", likePostRouter);

export { router as ApiRouter };
