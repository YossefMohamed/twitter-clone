import { ObjectId } from "mongoose";
import { app } from "./app";

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

let io = require("socket.io")(server);
let onlineUser: ObjectId[] = [];

io.on("connection", (socket: any) => {
  socket.on("setup", (currentUser: any) => socket.join(currentUser));
  socket.on("join room", (room: any) => socket.join(room));
  socket.on("typing", (room: any) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room: any) => socket.in(room).emit("stop typing"));
  socket.on("message received", (room: any) =>
    socket.in(room).emit("message received")
  );
  socket.on("new message", (message: any) =>
    socket.in(message.chat._id).emit("new message", message)
  );
  socket.on("notification received", (room: any) =>
    socket.in(room).emit("notification received")
  );
  socket.on("login", (userId: ObjectId) => {
    onlineUser.push(userId);
    console.log(onlineUser);

    socket.emit("online", onlineUser);
  });
  socket.on("logout", (userId: ObjectId) => {
    onlineUser = onlineUser.filter((user) => {
      return user !== userId;
    });
    console.log(onlineUser);

    socket.emit("online", onlineUser);
  });
});
