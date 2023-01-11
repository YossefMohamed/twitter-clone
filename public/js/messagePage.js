axios.get("/api/chat/").then(({ data }) => {
  outputChatList(data.data, $(".resultsContainer"));
});

const outputChatList = (chatList, container) => {
  console.log(chatList);
  chatList.forEach((chat) => {
    const html = createChatHtml(chat);
    container.append(html);
  });

  if (chatList.length == 0) {
    container.append("<span class='noResults'>Nothing to show.</span>");
  }
};

const createChatHtml = (chatData) => {
  console.log(chatData);
  const chatName = getChatName(chatData);
  const image = getChatImageElements(chatData);
  console.log(image);
  const latestMessage = "This is the latest message";

  return `<a href='/messages/${chatData._id}' class='resultListItem'>
  <div class='resultsImageContainer '><img src='63b88af8b3550845133f6dd31673038646972.png' alt='User's profile pic'></div>
                <div class='resultsDetailsContainer ellipsis'>
                    <span class='heading ellipsis'>${chatName}</span>
                    <span class='subText ellipsis'>${latestMessage}</span>
                </div>
            </a>`;
};

const getChatName = (chatData) => {
  let chatName = chatData.chatName;

  if (!chatName) {
    const otherChatUsers = getOtherChatUsers(chatData.users);
    const namesArray = otherChatUsers.map(
      (user) => user.firstName + " " + user.lastName
    );
    chatName = namesArray.join(", ");
  }

  return chatName;
};

const getOtherChatUsers = (users) => {
  if (users.length == 1) return users;

  return users.filter((user) => user._id !== currentUser);
};

const getChatImageElements = (chatData) => {
  const otherChatUsers = getOtherChatUsers(chatData.users);

  let groupChatClass = "";
  let chatImage = getUserChatImageElement(otherChatUsers[0]);

  if (otherChatUsers.length > 1) {
    groupChatClass = "groupChatImage";
    chatImage += getUserChatImageElement(otherChatUsers[1]);
  }

  return `<div class='resultsImageContainer ${groupChatClass}'>${chatImage}</div>`;
};

const getUserChatImageElement = (user) => {
  if (!user || !user.profilePic) {
    return alert("User passed into function is invalid");
  }

  return `<img src='${user.profilePic}' alt='User's profile pic'>`;
};