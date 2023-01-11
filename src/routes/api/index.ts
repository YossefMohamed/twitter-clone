import { Router } from "express";
import { addChatRouter } from "./chat/addChat";
import { getChatsRouter } from "./chat/getChats";
import { createPostsRouter } from "./post/addPost";
import { deletePostRouter } from "./post/deletePost";
import { getPostRouter } from "./post/getPost";
import { getPostsRouter } from "./post/getPosts";
import { likePostRouter } from "./post/likePost";
import { pinPostRouter } from "./post/pinPost";
import { replyToPostRouter } from "./post/replyToPost";
import { retweetPostRouter } from "./post/retweetPost";
import { followUserRouter } from "./user/followUser";
import { getUsersRouter } from "./user/getUsers";
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
router.use("/users", getUsersRouter);

router.use("/chat", addChatRouter);
router.use("/chat", getChatsRouter);

export { router as ApiRouter };
