let chat;
axios.get("/api/chat/" + chatId).then(({ data }) => {
  chat = data.data;
  document.querySelector("#chatName").value = getChatName(chat);
});
