// define ui vars

const form = document.querySelector("#task-form");
const formInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const clearTask = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".list-group");

loadEventListners();

// load event listners

function loadEventListners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  // add task event
  form.addEventListener("submit", addTask);

  // remove task event

  taskList.addEventListener("click", removeTask);

  // clear tasks event

  clearTask.addEventListener("click", clearTasks);

  // filter task event

  filter.addEventListener("keyup", filterTasks);
}

// get tasks from ls
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // create li element

    const li = document.createElement("li");

    // add class
    li.className = "list-group-item";

    // create text node and append to li

    li.appendChild(document.createTextNode(task));

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
  });
}

// add task
function addTask(e) {
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

  // store task in ls
  storeTaskInLocalStorage(formInput.value);

  // clear input
  formInput.value = "";

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-task")) {
    if (confirm("Are you sure to remove this task?")) {
      e.target.parentElement.parentElement.remove();

      // remove task from ls

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent.slice(0, -1) === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasks

function clearTasks() {
  // taskList.innerHTML = "";

  // faster

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
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
