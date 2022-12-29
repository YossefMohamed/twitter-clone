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

textbox.addEventListener("keyup", (event) => {
  const textboxValue = textbox.value.trim();
  const submitButton = document.querySelector("#submitPostButton");
  if (textboxValue.length) {
    return (submitButton.disabled = false);
  }
  submitButton.disabled = true;
});
