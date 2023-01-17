"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const express_1 = require("express");
const requireLogin_1 = require("../../middlewares/requireLogin");
const addChat_1 = require("./chat/addChat");
const changeChatName_1 = require("./chat/changeChatName");
const getChat_1 = require("./chat/getChat");
const getChats_1 = require("./chat/getChats");
const createMessage_1 = require("./message/createMessage");
const getMessagesByChat_1 = require("./message/getMessagesByChat");
const getNotifications_1 = require("./notification/getNotifications");
const markAllAsRead_1 = require("./notification/markAllAsRead");
const markAsRead_1 = require("./notification/markAsRead");
const addPost_1 = require("./post/addPost");
const deletePost_1 = require("./post/deletePost");
const getPost_1 = require("./post/getPost");
const getPosts_1 = require("./post/getPosts");
const likePost_1 = require("./post/likePost");
const pinPost_1 = require("./post/pinPost");
const replyToPost_1 = require("./post/replyToPost");
const retweetPost_1 = require("./post/retweetPost");
const followUser_1 = require("./user/followUser");
const getUsers_1 = require("./user/getUsers");
const imageUpload_1 = require("./user/imageUpload");
const router = (0, express_1.Router)();
exports.ApiRouter = router;
router.use(requireLogin_1.requireLogin);
router.use("/posts", addPost_1.createPostsRouter);
router.use("/posts", getPosts_1.getPostsRouter);
router.use("/posts", likePost_1.likePostRouter);
router.use("/posts", retweetPost_1.retweetPostRouter);
router.use("/posts", getPost_1.getPostRouter);
router.use("/posts", replyToPost_1.replyToPostRouter);
router.use("/posts", deletePost_1.deletePostRouter);
router.use("/posts", pinPost_1.pinPostRouter);
router.use("/users", followUser_1.followUserRouter);
router.use("/users", imageUpload_1.uploadImageRouter);
router.use("/users", getUsers_1.getUsersRouter);
router.use("/chats", addChat_1.addChatRouter);
router.use("/chats", getChats_1.getChatsRouter);
router.use("/chats", getChat_1.getChatRouter);
router.use("/chats", changeChatName_1.changeChatNameRouter);
router.use("/messages", createMessage_1.createMessageRouter);
router.use("/messages", getMessagesByChat_1.getMessagesByChat);
router.use("/notifications", getNotifications_1.getNotifications);
router.use("/notifications", markAsRead_1.markAsReadNotification);
router.use("/notifications", markAllAsRead_1.markAllAsReadNotification);
