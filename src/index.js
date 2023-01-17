"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT || 3000;
const server = app_1.app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
});
let io = require("socket.io")(server);
io.on("connection", (socket) => {
    socket.on("setup", (currentUser) => socket.join(currentUser));
    socket.on("join room", (room) => socket.join(room));
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    socket.on("message received", (room) => socket.in(room).emit("message received"));
    socket.on("notification received", (room) => socket.in(room).emit("notification received"));
});
