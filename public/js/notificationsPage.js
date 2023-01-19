axios.get("/api/notifications/").then(({ data }) => {
  renderNotifications(data.data, $(".resultsContainer"));
  refreshNotifications();
});

const renderNotifications = (notifications, container) => {
  notifications.forEach((notification) => {
    const html = createNotificationHtml(notification);
    container.append(html);
    $(html).click(() => {
      alert("j");
    });
  });

  if (notifications.length == 0) {
    container.append("<span class='noResults'>Nothing to show.</span>");
  }
};

function getNotificationText(notification) {
  const userFrom = notification.userFrom;

  if (!userFrom.firstName || !userFrom.lastName) {
    return alert("user from data not populated");
  }

  const userFromName = `${userFrom.firstName} ${userFrom.lastName}`;

  let text;

  if (notification.notificationType == "retweet") {
    text = `${userFromName} retweeted one of your posts`;
  } else if (notification.notificationType == "postLike") {
    text = `${userFromName} liked one of your posts`;
  } else if (notification.notificationType == "reply") {
    text = `${userFromName} replied to one of your posts`;
  } else if (notification.notificationType == "follow") {
    text = `${userFromName} followed you`;
  }

  return `<span class='ellipsis'>${text}</span>`;
}

function getNotificationUrl(notification) {
  let url;

  if (
    notification.notificationType == "retweet" ||
    notification.notificationType == "postLike" ||
    notification.notificationType == "reply"
  ) {
    url = `/posts/${notification.entityId}`;
  } else if (notification.notificationType == "follow") {
    url = `/profile/${notification.entityId}`;
  }

  return url;
}

$(document).on("click", ".notification", (event) => {
  const container = $(event.target);
  const notificationId = container.closest(".notification").attr("data-id");
  const href = container.closest(".notification").attr("href");
  event.preventDefault();
  const goToNotification = () => (window.location = href);
  axios.patch("/api/notifications/" + notificationId).then(({ data }) => {
    goToNotification();
  });
});

document.querySelector(".markAllAsRead").addEventListener("click", () => {
  axios.patch("/api/notifications/").then(({ data }) => {
    window.location.reload();
  });
});
