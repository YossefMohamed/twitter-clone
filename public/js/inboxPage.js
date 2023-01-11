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
let selectedUsers = [];
function outputUsers(results, container) {
  container.html("");

  results.forEach((result) => {
    const ifCurrent = selectedUsers.some((user) => user._id === result._id);
    if (result._id === currentUser || ifCurrent) return;
    const html = createUserHtml(result, true);
    const element = $(html);
    container.append(html);
    $(`#${result._id}`).click(() => {
      userSelected(result);
      container.html("");
      $("#userSearchTextbox").val("");
      console.log(selectedUsers.length);
      if (selectedUsers.length) {
        document.querySelector("#createChatButton").disabled = false;
      } else {
        document.querySelector("#createChatButton").disabled = true;
      }
    });
  });

  if (results.length == 0) {
    container.html("<h1 class='noResults'>No results found</h1>");
  }
}
const userSelected = (user) => {
  selectedUsers.push(user);

  document.querySelector(".selectedUsersContainer").innerHTML =
    `<span class="selectedUser"> ${user.username} </span> ` +
    document.querySelector(".selectedUsersContainer").innerHTML;
};

function createUserHtml(userData, showFollowButton = true) {
  const name = userData.firstName + " " + userData.lastName;

  return `<div class='user' id="${userData._id}">
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

document.addEventListener("click", () => {
  if (document.querySelector(".selectedUser")) {
    document
      .querySelector(".selectedUser")
      .addEventListener("click", function () {
        console.log(this.innerHTML);
        this.remove();
        selectedUsers = selectedUsers.filter((user) => {
          user.username !== this.innerHTML;
        });
        if (selectedUsers.length) {
          document.querySelector("#createChatButton").disabled = false;
        } else {
          document.querySelector("#createChatButton").disabled = true;
        }
      });
  }
});

document.querySelector("#createChatButton").addEventListener("click", () => {});
