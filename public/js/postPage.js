$(document).ready(() => {
  document.querySelector(".postContainer").innerHTML = getSpinner();
  console.log("/api/posts/" + currentPostId);
  axios
    .get("/api/posts/" + currentPostId)
    .then((res) => {
      deleteSpinner();
      console.log(res.data.data);
      if (res.data.data) {
        if (res.data.data.post.replyTo)
          document.querySelector(".postContainer").innerHTML = createPost(
            res.data.data.post.replyTo
          );

        document.querySelector(".postContainer").innerHTML =
          document.querySelector(".postContainer").innerHTML +
          createPost(res.data.data.post);

        if (res.data.data.replies.length) {
          console.log(res.data.data.replies);
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
