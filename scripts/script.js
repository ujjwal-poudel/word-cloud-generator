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
        console.log("It is a link");
    }

    else {
        console.log("It is a random text");
    }
  }
};

let submit = document.getElementById("submit-generate");

submit.addEventListener("click", function () {
    checkInformation();
});