$(document).ready(() => {
  document.querySelector(".postContainer").innerHTML = getSpinner();

  axios
    .get("/api/post")
    .then((res) => {
      deleteSpinner();
      if (!res.data.data.length) {
        document.querySelector(
          ".postContainer"
        ).innerHTML = `<h1 class="alert  no-result my-5">
            
                Nothing to show
            
            </h1>`;
      }
      res.data.data.map((post) => {
        document.querySelector(".postContainer").innerHTML =
          createPost(post) + document.querySelector(".postContainer").innerHTML;
      });
      // textbox.value = "";
      // submitButton.disabled = true;
    })
    .catch((error) => {
      console.log(error.message);
    });
});
