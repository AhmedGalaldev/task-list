// define ui vars

const form = document.querySelector("#task-form");
const formInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clearTask = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".list-group");

loadEventListners();

// load event listners

function loadEventListners() {
  // add task event
  form.addEventListener("submit", addTask);

  // remove task event

  taskList.addEventListener("click", removeTask);

  // clear tasks event

  clearTask.addEventListener("click", clearTasks);

  // filter task event

  filter.addEventListener("keyup", filterTasks);
}

// add task
function addTask(e) {
  e.preventDefault();

  if (formInput.value == "") {
    alert("Add Task");
  }

  // create li element

  const li = document.createElement("li");

  // add class
  li.className = "list-group-item";

  // create text node and append to li

  li.appendChild(document.createTextNode(formInput.value));

  // create link element

  const link = document.createElement("a");

  // add class to link
  link.className = "delete-task float-right";

  //add icon html

  link.innerHTML = "<li class='btn btn-danger'>x</li>";

  // append link to li

  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // clear input
  formInput.value = "";
}

// remove task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-task")) {
    if (confirm("Are you sure to remove this task?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// clear tasks

function clearTasks() {
  // taskList.innerHTML = "";

  // faster

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

// filter tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".list-group-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
