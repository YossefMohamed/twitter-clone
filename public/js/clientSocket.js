const connected = false;

const socket = io("http://localhost:3000");

socket.emit("setup", currentUser);

socket.on("connected", () => (connected = true));
