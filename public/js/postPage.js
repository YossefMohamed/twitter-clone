$(document).ready(() => {
  document.querySelector(".postContainer").innerHTML = getSpinner();
  console.log("/api/posts/" + currentPostId);
  axios
    .get("/api/posts/" + currentPostId)
    .then((res) => {
      deleteSpinner();
      if (res.data.data) {
        console.log(res.data.data);
        document.querySelector(".postContainer").innerHTML = createPost(
          res.data.data
        );
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
});
