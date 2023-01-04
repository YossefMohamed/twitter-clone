// $("#postTextarea").onChange((event) => {
//   const textbox = $(event.target);
//   const value = textbox.val().trim();
// console.log("value");
//   const submitButton = $("#submitPostButton");

//   if (submitButton.length == 0) return alert("No submit button found");

//   if (value == "") {
//     submitButton.prop("disabled", true);
//     return;
//   }

//   submitButton.prop("disabled", false);
// });

const textbox = document.querySelector("#postTextarea");
const submitButton = document.querySelector("#submitPostButton");

textbox?.addEventListener("keyup", (event) => {
  const textboxValue = textbox.value.trim();
  if (textboxValue.length) {
    submitButton.disabled = false;

    return;
  }
  submitButton.disabled = true;
});

submitButton?.addEventListener("click", () => {
  const textboxValue = textbox.value.trim();
  // console.log(textboxValue);
  const data = {
    content: textboxValue,
  };
  submitButton.disabled = true;

  axios
    .post("/api/posts", data)
    .then((res) => {
      // console.log(res.data.data);
      textbox.value = "";
      submitButton.disabled = true;
      deleteNoResult();
      document.querySelector(".postContainer").innerHTML =
        createPost(res.data.data) +
        document.querySelector(".postContainer").innerHTML;
    })
    .catch((error) => {
      submitButton.disabled = false;

      // console.log(error.message);
    });
});

const createPost = (postData) => {
  // console.log(postData);
  const isRetweet = !!postData.retweetData;
  const retweetedBy = isRetweet ? postData.postedBy : null;

  postData = isRetweet ? postData.retweetData : postData;

  const postedBy = postData.postedBy;
  // console.log(isRetweet);
  const displayName = postedBy.firstName + " " + postedBy.lastName;
  let timestamp = postData.createdAt;
  timestamp = moment(timestamp).from();
  timestamp = timestamp[0].toUpperCase() + timestamp.substring(1);

  let replyFlag = "";
  if (postData.replyTo) {
    console.log(postData);
    if (!postData.replyTo._id) {
      return alert("Reply to is not populated");
    }
    replyFlag = `
      <div class="replyFlag">
      Replying to <a href="/profile/${postData.replyTo.postedBy.username}" >@${postData.replyTo.postedBy.username}</a>
      </div>
    `;
  }
  return `<div class='post postData' data-id=${postData._id}>
  ${
    isRetweet
      ? `
        <div class="postActionContainer ">
        <a href="/profile/${
          retweetedBy._id
        }" class="username"> <i class='fas fa-retweet'></i> ${
          retweetedBy.firstName + " " + retweetedBy.lastName
        }  Retweeted </a>

        </div>
      `
      : ""
  }

              <div class='mainContentContainer'>
                  <div class='userImageContainer'>
                      <img src='${postedBy.profilePic}'>
                  </div>
                  <div class='postContentContainer'>
                      <div class='header'>
                          <a href='/profile/${
                            postedBy.username
                          }' class='displayName'>${displayName}</a>
                          <span class='username'>@${postedBy.username}</span>
                          <span class='date'>${timestamp}</span>
                      </div>
                      <div class='postBody'>
                      ${replyFlag}
                          <span>${postData.content}</span>
                      </div>
                      <div class='postFooter'>
                          <div class='postButtonContainer'>
                              <button class="replyButton"  data-toggle="modal" data-target="#replyModel">
                                  <i class='far fa-comment'></i>
                              </button>
                          </div>
                              <div class='postButtonContainer'>
                              <button class='retweetButton green'>
                                  <span class="retweetSpan ${
                                    postData.retweetUsers.includes(
                                      currentUser
                                    ) && "active"
                                  }">
                                  <i class='fas fa-retweet'></i>
                                  <span>
                                  <span class="retweetCounter">
                                  ${postData.retweetUsers.length || ""}
                                </span>
                              </button>
                          </div>
                          <div class='postButtonContainer red likeContainer'>
                              <button class="likeButton">
                                  <span class="likeSpan ${
                                    postData.likes.includes(currentUser) &&
                                    "active"
                                  }">
                                  <i class='far fa-heart'></i>
                                  <span>
                                  <span class="likesCounter">
                                  ${postData.likes.length || ""}
                                </span>
                              </button>
                             
                          </div>
                      </div>
                  </div>
              </div>
          </div>`;
};

const getSpinner = () => {
  return `<div class="text-center py-5 spinner-loader">
  
  <div class="spinner-border text-primary m-auto my-5" role="status">
  <span class="sr-only">Loading...</span>
</div>
  
  </div>`;
};

const deleteSpinner = () => {
  document.querySelector(".spinner-loader").style.display = "none";
};

const deleteNoResult = () => {
  if (document.querySelector(".no-result"))
    document.querySelector(".no-result").style.display = "none";
};

// like button
document.addEventListener("click", (event) => {
  const buttonElements = document.querySelectorAll(".likeButton");
  for (let i = 0; i < buttonElements.length; i++) {
    if (buttonElements[i].contains(event.target)) {
      const postId = getPostIdFromElement(buttonElements[i]);
      if (postId) {
        axios.patch("/api/posts/" + postId + "/like").then((res) => {
          const posts = document.querySelectorAll(`[data-id="${postId}"]`);

          posts.forEach((post) => {
            post.querySelector(".likesCounter").innerHTML =
              res.data.data.likes.length || "";

            res.data.data.likes.includes(currentUser)
              ? post.querySelector(".likeSpan").classList.add("active")
              : post.querySelector(".likeSpan").classList.remove("active");
          });
        });
      }
    }
  }
});

// retweet button
document.addEventListener("click", (event) => {
  const buttonElements = document.querySelectorAll(".retweetButton");
  for (let i = 0; i < buttonElements.length; i++) {
    if (buttonElements[i].contains(event.target)) {
      const postId = getPostIdFromElement(buttonElements[i]);
      if (postId) {
        axios.post("/api/posts/" + postId + "/retweet").then((res) => {
          const posts = document.querySelectorAll(`[data-id="${postId}"]`);

          posts.forEach((post) => {
            post.querySelector(".retweetCounter").innerHTML =
              res.data.data.retweetUsers.length || "";

            res.data.data.retweetUsers.includes(currentUser)
              ? post.querySelector(".retweetSpan").classList.add("active")
              : post.querySelector(".retweetSpan").classList.remove("active");
          });
        });
      }
    }
  }
});

const getPostIdFromElement = (element) => {
  const isRoot = element.classList.contains("post");
  const rootElement = isRoot ? element : element.closest(".post");
  const postId = rootElement.getAttribute("data-id");
  return postId;
};

// model
const replyTextBox = document.querySelector("#replyTextarea");
const replySubmitButton = document.querySelector("#submitReplyButton");

// replyHandler
replyTextBox.addEventListener("keyup", (event) => {
  const textboxValue = replyTextBox.value.trim();
  if (textboxValue.length) {
    replySubmitButton.disabled = false;

    return;
  }
  replySubmitButton.disabled = true;
});

// send reply to the server
replySubmitButton.addEventListener("click", () => {
  const textboxValue = replyTextBox.value.trim();

  axios
    .post("/api/posts/" + postId + "/reply", {
      content: textboxValue,
    })
    .then((res) => {
      location.reload();
    });
});

// reply post
let postId;
document.addEventListener("click", (event) => {
  const buttonElements = document.querySelectorAll(".replyButton");

  for (let i = 0; i < buttonElements.length; i++) {
    if (buttonElements[i].contains(event.target)) {
      postId = getPostIdFromElement(buttonElements[i]);
      const postInModel = document.querySelector(".postContainerModel");
      postInModel.innerHTML = getSpinner();
      replyTextBox.value = "";
      replySubmitButton.disabled = true;
      axios.get("/api/posts/" + postId).then((res) => {
        postInModel.innerHTML =
          createPost(res.data.data) +
          `<h6 class="p-2 ">
        Replaying to <a href="/profile/${res.data.data.postedBy.username}"> @${res.data.data.postedBy.username} </a>
        </h6>`;
        postInModel.querySelector(".postFooter").style.display = "none";
      });
    }
  }
});

// go to post page
$(document).on("click", ".post", (event) => {
  const postId = getPostIdFromElement(event.target);
  const element = $(event.target);
  if (postId && !element.is("i")) {
    window.location.href = `/posts/${postId}`;
  }
});
