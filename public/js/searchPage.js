$(document).ready(() => {
  let searchBoxValue = "";
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
  });
  document.querySelector("#searchBox").addEventListener("keyup", (event) => {
    searchBoxValue = event.target.value.trim();
    const url = selectedTab === "users" ? "/api/users" : "/api/posts";
    if (!searchBoxValue) return;
    axios.get(url + "?search=" + searchBoxValue).then(({ data }) => {
      if (selectedTab === "users") {
        return outputUsers(
          data.data,
          document.querySelector(".resultsContainer")
        );
      }
      data.data.map((post) => {
        document.querySelector(".resultsContainer").innerHTML =
          createPost(post) +
          document.querySelector(".resultsContainer").innerHTML;
      });
    });
  });
});

function outputUsers(results, container) {
  if (!container) return;
  container.innerHTML = "";

  results.forEach((result) => {
    const html = createUserHtml(result, true);
    container.innerHTML = container.innerHTML + html;
  });
  const followButton = document.querySelector(".followButton");
  followButton &&
    followButton.addEventListener("click", () => {
      const userId = followButton.getAttribute("data-user");
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
                    <img src='/images/${userData.profilePic}'>
                </div>
                <div class='userDetailsContainer'>
                <div class='header'>
                <a href='/profile/${userData.username}'>${name}</a>
                <span class='username'>@${userData.username}</span>
            </div><div class='header'>
            <a href='/profile/${userData.username}/following'>${userData.following.length} following</a>
            <a href='/profile/${userData.username}/followers'>${userData.followers.length} followers</a>
        </div>
                </div>
                ${followButton}
            </div>`;
}
