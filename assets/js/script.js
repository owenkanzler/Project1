// const test = document.querySelector("#button");
// const task = document.querySelector("#task");

// const url = "http://www.boredapi.com/api/activity/";

// function getActivity() {
//   fetch(url)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       task.textContent = data.activity;
//     });
// }

// test.addEventListener("click", getActivity);

const generateBtn = document.querySelector(".generate");
const saveBtn = document.querySelector(".save");
const trashBtn = document.querySelector(".trash");
const imgDiv = document.querySelector(".img");
const resultText = document.querySelector(".result");
const savedTasks = document.querySelector(".saved-tasks");

// function to fetch the data and handle the other function calls
function handleGenerate() {}

// function to update the result
function updateResult(result) {}

// function to update the image
function updateImg(query) {}

// function to save the task to saved tasks
function saveTask(task) {}

// listens for a click on the generate button
generateBtn.addEventListener("click", handleGenerate());

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
