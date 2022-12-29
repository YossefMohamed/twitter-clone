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
  return `<div class='post'>
              <div class='mainContentContainer'>
                  <div class='userImageContainer'>
                      <img src='${postedBy.profilePic}'>
                  </div>
                  <div class='postContentContainer'>
                      <div class='header'>
                          <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
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
                              <button>
                                  <i class='fas fa-retweet'></i>
                              </button>
                          </div>
                          <div class='postButtonContainer'>
                              <button>
                                  <i class='far fa-heart'></i>
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
