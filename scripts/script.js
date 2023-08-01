// Hide the word cloud container by default
document.getElementById("main__word-cloud").style.display = "none";

// Retrieving information from the textarea
let information = document.getElementById("input__text");

// Checking if the information is empty or not
function checkInformation() {
  if (information.value.length === 0) {
    alert("Please enter some information");
  } else {
    // Checking if the information is a link or other random text
    if (information.value.startsWith("http://") || information.value.startsWith("https://")) {
      console.log("It is a link");
      console.log(information.value);
      // Extracted text
      extractText(information.value); // Asynchronous operation, so no need to store it in a variable
    } else {
      console.log("It is random text");
      extractTextTwo(information.value);
    }
  }
}

let submit = document.getElementById("submit-generate");

submit.addEventListener("click", function () {
  document.getElementById("footer").style.display = "none";
  document.getElementById("main__word-cloud").style.display = "block";
  checkInformation();
});

// Creating a function to extract the text content from the given text
function extractTextTwo(textContent) {
  let element = document.createElement("div");
  element.innerHTML = textContent;

  generateWordCloud(element.textContent.trim());
}

// Creating a function to extract the text content from a website
async function extractText(webURL) {
  console.log("extractText function called");
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
    let text = element.textContent.trim(); // Trim the text content before using it

    // Pass the extracted text to the generateWordCloud function
    generateWordCloud(text);
  } catch (e) {
    console.log("Error: " + e);
  }
}

function generateWordCloud(text) {  
  text = text.toLowerCase();
  text = text.trim();

  let alphabetRegex = /[^a-zA-Z\s]/g;
  text = text.replace(alphabetRegex, "");
  console.log(text);

  const stopWords = [
    "a",
    "an",
    "and",
    "the",
    "is",
    "in",
    "of",
    "on",
    "at",
    "to",
    "for",
    "with",
    "by",
    "as",
    "I",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
    "my",
    "your",
    "his",
    "its",
    "our",
    "their",
    "mine",
    "yours",
    "hers",
    "ours",
    "theirs",
    "this",
    "that",
    "these",
    "those",
    "be",
    "being",
    "been",
    "am",
    "is",
    "are",
    "was",
    "were",
    "has",
    "have",
    "had",
    "do",
    "does",
    "did",
    "will",
    "shall",
    "should",
    "would",
    "can",
    "could",
    "may",
    "might",
    "must",
    "ought",
    "about",
    "above",
    "after",
    "against",
    "all",
    "also",
    "an",
    "and",
    "any",
    "are",
    "because",
    "been",
    "before",
    "being",
    "between",
    "both",
    "but",
    "by",
    "came",
    "can",
    "come",
    "could",
    "did",
    "do",
    "does",
    "each",
    "else",
    "for",
    "from",
    "get",
    "got",
    "has",
    "had",
    "he",
    "have",
    "her",
    "here",
    "him",
    "himself",
    "his",
    "how",
    "if",
    "in",
    "into",
    "is",
    "it",
    "its",
    "just",
    "like",
    "make",
    "many",
    "me",
    "might",
    "more",
    "most",
    "much",
    "must",
    "my",
    "never",
    "now",
    "of",
    "on",
    "only",
    "or",
    "other",
    "our",
    "ours",
    "out",
    "over",
    "own",
    "said",
    "same",
    "see",
    "should",
    "since",
    "so",
    "some",
    "such",
    "take",
    "than",
    "that",
    "the",
    "their",
    "them",
    "then",
    "there",
    "these",
    "they",
    "this",
    "those",
    "through",
    "to",
    "too",
    "under",
    "up",
    "use",
    "very",
    "want",
    "was",
    "way",
    "we",
    "well",
    "were",
    "what",
    "when",
    "where",
    "which",
    "while",
    "who",
    "will",
    "with",
    "would",
    "you",
    "your",
  ];
  
  for (let i = 0; i < stopWords.length; i++) {
    let regex = new RegExp("\\b" + stopWords[i] + "\\b", "g");
    text = text.replace(regex, "");
  }

  let words = text.split(/\s+/);

  words.sort();

  let unique = [[words[0], 1]];

  let uniqueIndex = 0;

  for(let i=0; i<words.length; i++) {
    if (words[i] === words[i-1]) {
      unique[uniqueIndex][1]++;
    } else {
      uniqueIndex++;
      unique[uniqueIndex] = [words[i], 1];
      unique.sort(byDuplicate);
      function byDuplicate(a, b) {
        return b[1] - a[1];
      }
    }

    unique = unique.slice(0, 100);

    let maxWordCount = unique[0][1];

    unique.sort();

    let cloudBox = document.getElementById("main__word-cloud");
    cloudBox.innerHTML = "";

    const colors = [
      "word-color-1",
      "word-color-2",
      "word-color-3",
      "word-color-4",
      "word-color-5",
      "word-color-6",
      "word-color-7",
      "word-color-8",
      "word-color-9",
      "word-color-10"
    ];

    for (let i = 0; i < unique.length; i++) {
      let word = document.createElement("span");
      word.innerHTML = unique[i][0];
      word.style.fontSize = ((unique[i][1] / maxWordCount) + 1) * 2 + "em";
  
      // Applying different colors to words based on index
      word.classList.add(colors[i % colors.length]);
  
      cloudBox.appendChild(word);
  
      // Adding a space after each word
      if (i < unique.length - 1) {
        let space = document.createTextNode(" ");
        cloudBox.appendChild(space);
      }
    }
  }
};    