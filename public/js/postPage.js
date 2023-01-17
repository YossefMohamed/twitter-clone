$(document).ready(() => {
  document.querySelector(".postContainer").innerHTML = getSpinner();
  axios
    .get("/api/posts/" + currentPostId)
    .then((res) => {
      deleteSpinner();
      if (res.data.data) {
        if (res.data.data.post.replyTo)
          document.querySelector(".postContainer").innerHTML = createPost(
            res.data.data.post.replyTo
          );

        document.querySelector(".postContainer").innerHTML =
          document.querySelector(".postContainer").innerHTML +
          createPost(res.data.data.post, true);

        if (res.data.data.replies.length) {
          res.data.data.replies.map((reply) => {
            document.querySelector(".postContainer").innerHTML =
              document.querySelector(".postContainer").innerHTML +
              createPost(reply);
          });
        }
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
});
