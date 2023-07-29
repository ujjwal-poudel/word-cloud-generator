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
        console.log(information.value);
        extractText(information.value);
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

// Creating a function to extract the text content from website
async function extractText(webURL) {
  try {
    // Fetching the webpage content
    let response = await fetch(webURL);

    // Checking if the response is successful or not
    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }

    // Getting the text content from the webpage
    let content = await response.text();

    // Creating a new element to store the text content
    let element = document.createElement("div");
    element.innerHTML = content;

    // Extracting the text content from the webpage
    let text = element.textContent;

    // Checking in console
    console.log(text);
  }

  catch (e) {
    console.log("Error: " + e);
  };
};
