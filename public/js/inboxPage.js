let searchBoxValue = "";
document
  .querySelector("#userSearchTextbox")
  .addEventListener("keyup", (event) => {
    searchBoxValue = event.target.value.trim();

    const url = "/api/users";
    if (!searchBoxValue) return ($(".resultsContainer").innerHTML = "");
    axios.get(url + "?search=" + searchBoxValue).then(({ data }) => {
      return outputUsers(data.data, $(".resultsContainer"));
    });
  });
const chatList = [];
function outputUsers(results, container) {
  if (!container) return;
  container.html("");

  results.forEach((result) => {
    if (result._id === currentUser) return;
    const html = createUserHtml(result, true);
    const element = $(html);
    console.log(element[0]);
    element.click(() => console.log("hi"));
    element.click(() => console.log("hi"));
    container.append(html);
  });

  if (results.length == 0) {
    container.html("<h1 class='noResults'>No results found</h1>");
  }
}

function createUserHtml(userData, showFollowButton = true) {
  const userLoggedIn = JSON.parse(currentUserObj);
  const name = userData.firstName + " " + userData.lastName;
  const isFollowing =
    userLoggedIn.following && userLoggedIn.following.includes(userData._id);
  const text = isFollowing ? "Following" : "Follow";
  const buttonClass = isFollowing ? "followButton following" : "followButton";

  let followButton = "";
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
            </div>`;
}
