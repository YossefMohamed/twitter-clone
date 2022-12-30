// $("#postTextarea").onChange((event) => {
//   const textbox = $(event.target);
//   const value = textbox.val().trim();
//   console.log("value");
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

textbox.addEventListener("keyup", (event) => {
  const textboxValue = textbox.value.trim();
  if (textboxValue.length) {
    submitButton.disabled = false;

    return;
  }
  submitButton.disabled = true;
});

submitButton.addEventListener("click", () => {
  const textboxValue = textbox.value.trim();
  console.log(textboxValue);
  const data = {
    content: textboxValue,
  };
  submitButton.disabled = true;

  axios
    .post("/api/post", data)
    .then((res) => {
      console.log(res.data.data);
      textbox.value = "";
      submitButton.disabled = true;
      deleteNoResult();
      document.querySelector(".postContainer").innerHTML =
        createPost(res.data.data) +
        document.querySelector(".postContainer").innerHTML;
    })
    .catch((error) => {
      submitButton.disabled = false;

      console.log(error.message);
    });
});

const createPost = (postData) => {
  const postedBy = postData.postedBy;

  const displayName = postedBy.firstName + " " + postedBy.lastName;
  let timestamp = postData.createdAt;
  timestamp = moment(timestamp).from();
  timestamp = timestamp[0].toUpperCase() + timestamp.substring(1);
  return `<div class='post' data-id=${postData._id}>
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
                          <span>${postData.content}</span>
                      </div>
                      <div class='postFooter'>
                          <div class='postButtonContainer'>
                              <button>
                                  <i class='far fa-comment'></i>
                              </button>
                          </div>
                              <div class='postButtonContainer'>
                              <button class='retweetButton green'>
                                  <span class="likeSpan ${
                                    postData.likes.includes(currentUser) &&
                                    "active"
                                  }">
                                  <i class='fas fa-retweet'></i>
                                  <span>
                                  <span class="likesCounter">
                                  ${postData.likes.length || ""}
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
        axios.patch("/api/post/" + postId + "/like").then((res) => {
          buttonElements[i].querySelector(".likesCounter").innerHTML =
            res.data.data.likes.length || "";
          res.data.data.likes.includes(currentUser)
            ? buttonElements[i]
                .querySelector(".likeSpan")
                .classList.add("active")
            : buttonElements[i]
                .querySelector(".likeSpan")
                .classList.remove("active");
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
        axios.post("/api/post/" + postId + "/retweet").then((res) => {
          console.log(res);
          // buttonElements[i].querySelector(".likesCounter").innerHTML =
          //   res.data.data.likes.length || "";
          // res.data.data.likes.includes(currentUser)
          //   ? buttonElements[i]
          //       .querySelector(".likeSpan")
          //       .classList.add("active")
          //   : buttonElements[i]
          //       .querySelector(".likeSpan")
          //       .classList.remove("active");
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
