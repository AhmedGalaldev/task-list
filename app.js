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
  link.className = "float-right";

  //add icon html

  link.innerHTML = "<li class='btn btn-danger'>x</li>";

  // append link to li

  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // clear input
  formInput.value = "";
}
