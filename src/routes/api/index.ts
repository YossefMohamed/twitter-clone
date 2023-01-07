import { Router } from "express";
import { createPostsRouter } from "./post/addPost";
import { deletePostRouter } from "./post/deletePost";
import { getPostRouter } from "./post/getPost";
import { getPostsRouter } from "./post/getPosts";
import { likePostRouter } from "./post/likePost";
import { pinPostRouter } from "./post/pinPost";
import { replyToPostRouter } from "./post/replyToPost";
import { retweetPostRouter } from "./post/retweetPost";
import { followUserRouter } from "./user/followUser";
import { uploadImageRouter } from "./user/imageUpload";

const router = Router();
router.use("/posts", createPostsRouter);
router.use("/posts", getPostsRouter);
router.use("/posts", likePostRouter);
router.use("/posts", retweetPostRouter);
router.use("/posts", getPostRouter);
router.use("/posts", replyToPostRouter);
router.use("/posts", deletePostRouter);
router.use("/posts", pinPostRouter);

router.use("/users", followUserRouter);
router.use("/users", uploadImageRouter);

export { router as ApiRouter };
