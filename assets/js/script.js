const generateBtn = document.querySelector(".generate");
const saveBtn = document.querySelector(".save");
const trashBtn = document.querySelector(".trash");
const imgDiv = document.querySelector(".img");
const resultText = document.querySelector(".result");
const savedTasks = document.querySelector(".saved-tasks");

const boredUrl = "http://www.boredapi.com/api/activity/";

// function to fetch the data and handle the other function calls
function handleGenerate() {
  fetch(boredUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      resultText.textContent = data.activity;
      const unsplashUrl = `https://api.unsplash.com/search/photos?query=${resultText.textContent}&client_id=uEtmAUoBLQ-XIdj7fEFu3WLm_0YrDSkENDqKQTByzq8`;
      return fetch(unsplashUrl);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      imgDiv.innerHTML = "";
      const imgEl = document.createElement("img");
      imgEl.setAttribute("src", data.results[0].urls.full);
      imgEl.setAttribute(
        "style",
        "width: 100%; height: 100%; object-fit: cover"
      );
      imgDiv.append(imgEl);
    });
}

// function to save the task to saved tasks
function saveTask(task) {}

// listens for a click on the generate button
generateBtn.addEventListener("click", handleGenerate);

// listens for a click on the save button
saveBtn.addEventListener("click", () => {
  // get whatever is in the result paragraph
  const result = resultText.innerHTML;

  // check to see if there is anything in the result and then call the function
  if (result) {
    saveTask(result);
  }
});

// listens for a click on the trash button
trashBtn.addEventListener("click", () => {
  resultDiv.innerHTML = "";
  imgDiv.style.backgroundImage = "";
});
