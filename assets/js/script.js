const generateBtn = document.querySelector(".generate");
const saveBtn = document.querySelector(".save");
const trashBtn = document.querySelector(".trash");
const imgDiv = document.querySelector(".img");
const resultText = document.querySelector(".result");
const savedTasks = document.querySelector(".saved-tasks");
const showSaved = document.querySelector(".show-saved");
const hideSaved = document.querySelector(".hide-saved");
const modal = document.querySelector(".modal-backdrop");

// bored api url
const boredUrl = "https://www.boredapi.com/api/activity/";
// existing tasks from local storage
const existingTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];

const themeToggle = document.querySelector("#themeToggle");
const navBar = document.querySelector("header");
const body = document.body;
//toggle theme "light or dark"
themeToggle.addEventListener("change", function () {
  if (this.checked) {
    body.className = "dark-theme";
    navBar.className = "dark-header";
  } else {
    body.className = "light-theme";
    navBar.className = "light-header";
  }
});

// function to fetch the data and handle the other function calls
function handleGenerate() {
  // fetch the data from the bored api
  fetch(boredUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // set the result text to the activity
      resultText.textContent = data.activity;
      const unsplashUrl = `https://api.unsplash.com/search/photos?query=${resultText.textContent}&client_id=uEtmAUoBLQ-XIdj7fEFu3WLm_0YrDSkENDqKQTByzq8`;
      return fetch(unsplashUrl);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // set the image to the first image in the results
      imgDiv.innerHTML = "";
      // create an image element
      const imgEl = document.createElement("img");
      // set the image element attributes
      imgEl.setAttribute("src", data.results[0].urls.full);
      imgEl.setAttribute(
        "style",
        "width: 100%; height: 100%; object-fit: cover"
      );
      // append the image element to the image div
      imgDiv.append(imgEl);
    });
}

function deleteTask(index) {
  // Remove the task from the existingTasks array
  existingTasks.splice(index, 1);

  // Update localStorage
  localStorage.setItem("savedTasks", JSON.stringify(existingTasks));

  // Update indices of remaining tasks
  existingTasks.forEach((task, i) => {
    task.index = i; // Update the index of each task
  });

  // Render the updated tasks
  rendertasks(existingTasks);
}

// function to save the task to saved tasks
function saveTask(task) {
  const taskObject = {
    activity: task,
    // Assigning index based on the length of the array
    index: existingTasks.length,
  };

  // Push the task object to existingTasks
  existingTasks.push(taskObject);

  // Save the task to local storage
  localStorage.setItem("savedTasks", JSON.stringify(existingTasks));

  // Call the render tasks function
  rendertasks(existingTasks);
}

// function to render the tasks to the page
function rendertasks(tasks) {
  // Clear the saved tasks
  savedTasks.innerHTML = "";

  // Loop through the tasks and render them
  tasks.forEach((task) => {
    const liEl = document.createElement("li");
    const deleteBtn = document.createElement("button");
    liEl.classList.add("task");
    deleteBtn.textContent = "X";
    deleteBtn.setAttribute("style", "color: red");

    // Attach event listener to delete button
    deleteBtn.addEventListener("click", () => {
      // Pass the index of the task to delete
      deleteTask(task.index);
    });

    // Render the activity of the task
    liEl.textContent = task.activity;
    liEl.appendChild(deleteBtn);
    savedTasks.append(liEl);
  });
}

showSaved.addEventListener("click", () => {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

hideSaved.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
});

// listens for a click on the generate button
generateBtn.addEventListener("click", handleGenerate);

// listens for a click on the save button
saveBtn.addEventListener("click", () => {
  // get whatever is in the result paragraph
  const result = resultText.innerHTML;

  // check to see if there is anything in the result and then call the function
  if (result && result !== "Text...") {
    saveTask(result);
  }
});

// listens for a click on the trash button
trashBtn.addEventListener("click", () => {
  resultText.innerHTML = "";
  imgDiv.innerHTML = "";
});

// listens for the DOM to be loaded and then calls the render tasks function
document.addEventListener("DOMContentLoaded", rendertasks(existingTasks));
