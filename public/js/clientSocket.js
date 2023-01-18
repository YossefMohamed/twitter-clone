const connected = false;

const refreshNotifications = () => {
  axios.get("/api/notifications/").then(({ data }) => {
    const notifications = data.data;
    if (!notifications.length) return;
    notifications.forEach((notification) => {
      document.querySelector(".notificationsNumber").style.display =
        !notification.opened && "block";
    });
  });
};

const refreshMessages = () => {
  axios.get("/api/chats/").then(({ data }) => {
    data.data.forEach((chat) => {
      if (!chat.latestMessage.readBy.some((user) => user === currentUser))
        document.querySelector(".messagesNumber").style.display = "block";
    });
  });
};

const socket = io(window.location.origin);

socket.emit("setup", currentUser);

socket.on("connected", () => (connected = true));

const emitNotification = (userId) => {
  if (userId === currentUser) return;
  socket.emit("notification received", userId);
};

const emitMessage = (userId) => {
  if (userId === currentUser) return;
  socket.emit("message received", userId);
};

socket.on("notification received", () => {
  refreshNotifications();
});

socket.on("message received", () => {
  refreshMessages();
});
