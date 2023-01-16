import { app } from "./app";
import { IUser } from "./schemas/userSchema";

const port = process.env.PORT! || 3000;
const server = app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

let io = require("socket.io")(server);

io.on("connection", (socket: any) => {
  socket.on("setup", (currentUser: any) => socket.join(currentUser));
  socket.on("join room", (room: any) => socket.join(room));
  socket.on("typing", (room: any) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room: any) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessage: any) => {
    const chat = newMessage.chat;
    if (!chat.users) return console.log("no users in the chat");
    chat.users.forEach((user: IUser) => {
      if (`${user._id}` === `${newMessage.sender._id}`) {
        socket.in(newMessage.chat._id).emit("message received", newMessage);
      }
    });
  });

  socket.on("notification received", (room: any) =>
    socket.in(room).emit("notification received")
  );
});
