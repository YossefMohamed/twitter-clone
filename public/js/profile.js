let followButton = document.querySelector(".followButton");

$(document).ready(() => {
  profileUser = JSON.parse(profileUser);

  if (followButton) {
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
  }
  if (selectedTab === "replies") {
    loadPosts(true);
  } else {
    loadPosts();
  }

  followButton &&
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

  if (selectedTab == "followers") {
    outputUsers(
      profileUser.followers,
      document.querySelector(".resultsContainer")
    );
  } else {
    outputUsers(
      profileUser.following,
      document.querySelector(".resultsContainer")
    );
  }
  function outputUsers(results, container) {
    container.innerHTML = "";

    results.forEach((result) => {
      const html = createUserHtml(result, true);
      container.innerHTML = container.innerHTML + html;
    });
    const followButton = document.querySelector(".followButton");
    followButton &&
      followButton.addEventListener("click", () => {
        const userId = followButton.getAttribute("data-user");
        console.log(userId);
        axios.post("/api/users/" + userId + "/follow").then(({ data }) => {
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
    if (results.length == 0) {
      container.innerHTML = "<h1 class='noResults'>No results found</h1>";
    }
  }

  function createUserHtml(userData, showFollowButton) {
    const userLoggedIn = JSON.parse(currentUserObj);
    const name = userData.firstName + " " + userData.lastName;
    console.log(userLoggedIn);
    const isFollowing =
      userLoggedIn.following && userLoggedIn.following.includes(userData._id);
    const text = isFollowing ? "Following" : "Follow";
    const buttonClass = isFollowing ? "followButton following" : "followButton";

    let followButton = "";
    if (showFollowButton && userLoggedIn._id != userData._id) {
      followButton = `<div class='followButtonContainer'>
                            <button class='${buttonClass} followButton' data-user='${userData._id}'>${text}</button>
                        </div>`;
    }

    return `<div class='user' >
                <div class='userImageContainer'>
                    <img src='${userData.profilePic}'>
                </div>
                <div class='userDetailsContainer'>
                    <div class='header'>
                        <a href='/profile/${userData.username}'>${name}</a>
                        <span class='username'>@${userData.username}</span>
                    </div>
                </div>
                ${followButton}
            </div>`;
  }
});

function loadPosts(isReply = false) {
  if (document.querySelector(".postsContainer")) {
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
}
