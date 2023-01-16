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

const socket = io("http://localhost:3000");

socket.emit("setup", currentUser);

socket.on("connected", () => (connected = true));

const emitNotification = (userId) => {
  console.log(userId === currentUser, userId, currentUser);
  if (userId === currentUser) return;
  socket.emit("notification received", userId);
};

socket.on("notification received", () => {
  console.log("newwwwwwwww");
  refreshNotifications();
});
