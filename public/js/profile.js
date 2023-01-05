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
    .then((res) => {
      res.data.data.map((post) => {
        console.log(post);
        document.querySelector(".postsContainer").innerHTML =
          createPost(post) +
          document.querySelector(".postsContainer").innerHTML;
      });
    });
}
