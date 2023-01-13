let chat;

const chatNameinput = document.querySelector("#chatName");

socket.emit("join room", chatId);

const typeingToServer = (typing = true) => {
  if (typing) socket.emit("typing", chatId);

  setTimeout(() => {
    socket.emit("stop typing", chatId);
  }, 3000);
};

socket.on("typing", () => {
  if (!document.querySelector(".typingElement"))
    document.querySelector(".chatMessages").innerHTML =
      document.querySelector(".chatMessages").innerHTML +
      `<li class='message theirs pt-3 typingElement'>
                <div class='messageContainer'>
                    <span class='messageBody'>
                      typing..
                    </span>
                </div>
            </li>`;
});

socket.on("stop typing", () => {
  if (document.querySelector(".typingElement")) {
    document.querySelector(".typingElement").remove();
  }
});

axios.get("/api/chats/" + chatId).then(({ data }) => {
  chat = data.data;
  chatNameinput.value = getChatName(chat);
  document.querySelector(".chatMessages").innerHTML = getSpinner();
  axios.get("/api/messages/" + chatId).then(({ data }) => {
    deleteSpinner();
    if (!data.data.length) {
      return (document.querySelector(".chatMessages").innerHTML = `
      <h1>
      
      Let's Start A Conversation
      
      </h1>
     `);
    }

    data.data.map((message) => {
      document.querySelector(".chatMessages").innerHTML =
        document.querySelector(".chatMessages").innerHTML +
        createMessageHtml(message);
    });
  });
});

const chatNameHandler = (event) => {
  const inputValue = event.target.value;
  inputValue.length > 0
    ? axios
        .patch("/api/chats/" + chatId, {
          name: event.target.value,
        })
        .then(({ data }) => {
          chatNameinput.classList.remove("inputError");
        })
    : chatNameinput.classList.add("inputError");
};

chatNameinput.addEventListener("change", chatNameHandler);

const messageContent = document.querySelector("#messageContent");
messageContent.addEventListener("keyup", () => {
  typeingToServer();
});
document
  .querySelector(".sendMessageButton")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const content = messageContent.value;
    if (content.length) {
      socket.emit("stop typing", chatId);

      messageContent.value = "";
      axios
        .post("/api/messages/", {
          content,
          chat: chatId,
        })
        .then(({ data }) => {
          socket.emit("new message", data.data);
          document.querySelector(".chatMessages").innerHTML =
            document.querySelector(".chatMessages").innerHTML +
            messageReceived(data.data);
        });
    }
  });

const createMessageHtml = (message, nextMessage, lastSenderId) => {
  const sender = message.sender;
  const senderName = sender.firstName + " " + sender.lastName;

  const currentSenderId = sender._id;

  const isMine = message.sender._id === currentUser;
  const liClassName = isMine ? "mine" : "theirs";

  let nameElement = "";

  if (!isMine) {
    nameElement = `<span class='senderName'>${senderName}</span>`;
  }

  let profileImage = "";
  profileImage = `<img src='/images/${sender.profilePic}'>`;

  let imageContainer = "";
  if (!isMine) {
    imageContainer = `<div class='imageContainer ellipse'>
                              ${profileImage}
                          </div>`;
  }

  return `<li class='message ${liClassName}'>
              ${imageContainer}
              <div class='messageContainer'>
                  ${nameElement}
                  <span class='messageBody'>
                      ${message.content}
                  </span>
              </div>
          </li>`;
};

socket.on("message received", (newMessage) => {
  console.log(newMessage);
  document.querySelector(".chatMessages").innerHTML =
    document.querySelector(".chatMessages").innerHTML +
    messageReceived(newMessage);
});

const messageReceived = (newMessage) => {
  return createMessageHtml(newMessage);
};
