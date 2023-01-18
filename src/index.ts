import { app } from "./app";

const port =  3000;
const server = app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
});

let io = require("socket.io")(server);

io.on("connection", (socket: any) => {
  socket.on("setup", (currentUser: any) => socket.join(currentUser));
  socket.on("join room", (room: any) => socket.join(room));
  socket.on("typing", (room: any) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room: any) => socket.in(room).emit("stop typing"));
  socket.on("message received", (room: any) =>
    socket.in(room).emit("message received")
  );

  socket.on("notification received", (room: any) =>
    socket.in(room).emit("notification received")
  );
});
