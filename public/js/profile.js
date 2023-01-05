$(document).ready(() => {
  if (selectedTab === "replies") {
    loadPosts(true);
  } else {
    loadPosts();
  }
});

function loadPosts(isReply = false) {
  axios
    .get("/api/posts", {
      params: {
        postedBy: profileUserId,
        isReply,
      },
    })
    .then((res) => console.log(res));
}
