import { Router } from "express";
import { addChatRouter } from "./chat/addChat";
import { changeChatNameRouter } from "./chat/changeChatName";
import { getChatRouter } from "./chat/getChat";
import { getChatsRouter } from "./chat/getChats";
import { createMessageRouter } from "./message/createMessage";
import { getMessagesByChat } from "./message/getMessagesByChat";
import { getNotifications } from "./notification/getNotifications";
import { markAllAsReadNotification } from "./notification/markAllAsRead";
import { markAsReadNotification } from "./notification/markAsRead";
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

router.use("/chats", addChatRouter);
router.use("/chats", getChatsRouter);
router.use("/chats", getChatRouter);
router.use("/chats", changeChatNameRouter);

router.use("/messages", createMessageRouter);
router.use("/messages", getMessagesByChat);

router.use("/notifications", getNotifications);
router.use("/notifications", markAsReadNotification);
router.use("/notifications", markAllAsReadNotification);

export { router as ApiRouter };
