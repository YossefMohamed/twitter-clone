document.querySelector(".resultsContainer").innerHTML = getSpinner();
axios.get("/api/chats/").then(({ data }) => {
  deleteSpinner();
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
  const chatName = getChatName(chatData);
  const image = getChatImageElements(chatData);
  const latestMessage = "This is the latest message";

  return `<a href='/messages/${chatData._id}' class='resultListItem'>
          ${image}
                        <div class='resultsDetailsContainer ellipsis'>
                            <span class='heading ellipsis'>${chatName}</span>
                            <span class='subText ellipsis'>${latestMessage}</span>
                        </div>
                    </a>`;
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

  return `<img src='/images/${user.profilePic}' alt='User's profile pic'>`;
};
