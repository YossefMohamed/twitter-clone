let chat;

const chatNameinput = document.querySelector("#chatName");
axios.get("/api/chats/" + chatId).then(({ data }) => {
  chat = data.data;
  chatNameinput.value = getChatName(chat);
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

chatNameinput.addEventListener("keyup", chatNameHandler);
chatNameinput.addEventListener("change", chatNameHandler);
