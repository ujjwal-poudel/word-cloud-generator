// Retreiving information from the textarea
let information = document.getElementById("input__text");

// Checking if the information is empty or not
function checkInformation() {
  if (information.value.length == 0) {
    alert("Please enter some information");
  }

  else {
    // Checking if the information is a link or other random text
    if (information.value.startsWith("http://") || information.value.startsWith("https://")) {
        alert("It is a link");
    }

    else {
        alert("It is not a link");
    }
  }
};

let submit = document.getElementById("submit-generate");

submit.addEventListener("click", function () {
    checkInformation();
});