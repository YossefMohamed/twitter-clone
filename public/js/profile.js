const followButton = document.querySelector(".followButton");

$(document).ready(() => {
  profileUser = JSON.parse(profileUser);

  if (
    profileUser.followers &&
    profileUser.followers.map(({ _id }) => {
      return `${profileUserId}` === `${_id}`;
    }).length
  ) {
    followButton.classList.add("following");
    followButton.innerHTML = "Unfollow";
  } else {
    followButton.classList.remove("following");
    followButton.innerHTML = "Follow";
  }

  if (selectedTab === "replies") {
    loadPosts(true);
  } else {
    loadPosts();
  }

  followButton.addEventListener("click", () => {
    axios.post("/api/users/" + profileUserId + "/follow").then(({ data }) => {
      if (
        data.data.following.map((userId) => {
          return `${profileUserId}` === `${userId}`;
        }).length
      ) {
        followButton.classList.add("following");
        followButton.innerHTML = "Unfollow";
      } else {
        followButton.classList.remove("following");
        followButton.innerHTML = "Follow";
      }
    });
  });
});

function loadPosts(isReply = false) {
  document.querySelector(".postsContainer").innerHTML = getSpinner();
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
      deleteSpinner();
    });
}
