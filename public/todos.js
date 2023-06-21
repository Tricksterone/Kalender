function initTodosList() {
  initSideBar();
  setupListeners();
  ListTodos();
  window.addEventListener("resize", initSideBar);
}

function setupListeners() {
  const createTodoBtn = document.querySelector("#createTodoLink");
  const todoForm = document.getElementById("todoForm");
  const otherElements = document.querySelectorAll(
    "main.item-b > div.main-container > div.left > div.sidebar > div.top > ul > li:not(:first-child)"
  );

  createTodoBtn.addEventListener("click", function (event) {
    event.preventDefault();
    // todoForm.classList.toggle("hidden");

    // Toggle visibility of other elements
    for (let element of otherElements) {
      // element.classList.toggle("hidden");
    }
  });
}

let eventsArr = [];

const form = document.getElementById("form"),
  title = document.getElementById("titleInput"),
  errorMsgTitle = document.getElementById("error-message-title"),
  errorMsgDate = document.getElementById("error-message-date"),
  dateInput = document.getElementById("dateInput"),
  description = document.getElementById("textInput"),
  createdTodo = document.getElementById("created-todo");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  formValidation();
});

function initSideBar() {
  let btn = document.querySelector("#btn");
  let sidebar = document.querySelector(".sidebar");
  let todoForm = document.getElementById("todoForm");

  btn.onclick = function () {
    sidebar.classList.toggle("active");
  };
  if (window.innerWidth <= 1140) {
    sidebar.classList.add("active");
  }

  let createTodoLink = document.querySelector("#createTodoLink");
  createTodoLink.addEventListener("click", (event) => {
    event.preventDefault();
    // todoForm.classList.toggle("hidden");
  });
}

const submitButton = document.querySelector("#form button[type='submit']");
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  formValidation();
  new Calendar();
});

const formValidation = () => {
  if (title.value === "") {
    errorMsgTitle.innerHTML = "Du måste skriva in en titel";
  } else if (dateInput.value === "") {
    errorMsgDate.innerHTML = "Du måste välja ett datum!";
    errorMsgTitle.innerHTML = "";
  } else {
    errorMsgTitle.innerHTML = "";
    errorMsgDate.innerHTML = "";
    collectData();
    resetForm();
  }
};

function collectData() {
  TodoCollection.push({
    title: title.value,
    day: dateInput.value,
    description: description.value,
  });
  localStorage.setItem("todos", JSON.stringify(TodoCollection));
  createdTodoMessage();
}

function createdTodoMessage() {
  // createdTodo.innerHTML = "Du har lagt till en to-do";
  ListTodos();
  resetForm();
  // todoForm.classList.add("hidden"); // Hide the form
}

//function to get events from local storage
function getEvents() {
  //check if events are already saved in local storage then return events else nothing
  if (localStorage.getItem("todos") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("todos")));
}

function ListTodos() {
  const todos = document.querySelector("#todos");
  todos.innerHTML = "";

  // Retrieve events from local storage
  getEvents();

  TodoCollection.forEach(function (x, y) {
    // Check if x is not null
    if (x) {
      // Access the properties only if x is not null
      todos.innerHTML += `
        <li id=${y}>
          <span>${x.title ? x.title : ""}</span><br>
          <p>${x.day ? x.day : ""}</p><br>
          <p>Beskrivning:</p>
          <span>${x.description ? x.description : ""}</span><br>
          <i data-cy="delete-todo-button" onClick="deleteTodo(this)" class="fa-solid fa-trash" style="color: #3d4657;"></i>
          <i data-cy="edit-todo-button" onClick="editTodo(this)" class="fa-solid fa-pen-to-square" style="color: #2b384f;"></i>
        </li>`;
    }
  });
}

const resetForm = () => {
  title.value = "";
  dateInput.value = "";
  description.value = "";
};

// Uppdatera to-do
const editTodo = (td) => {
  const selectedTodo = td.parentElement;
  const titleInput = document.getElementById("titleInput");
  const dateInput = document.getElementById("dateInput");
  const textInput = document.getElementById("textInput");
  const todoForm = document.getElementById("todoForm");

  const titleElement = selectedTodo.children[0];
  const dateElement = selectedTodo.children[2];
  const descriptionElement = selectedTodo.children[5];

  if (titleElement && dateElement && descriptionElement) {
    const todoIndex = parseInt(selectedTodo.getAttribute("id")); // Retrieve the index of the selected todo
    if (!isNaN(todoIndex)) {
      titleInput.value = titleElement.innerHTML;
      dateInput.value = dateElement.innerHTML;
      textInput.value = descriptionElement.innerHTML;

      deleteTodo(td);

      // Show the todo form
      todoForm.style.display = "block";
    }
  }
  new Calendar();
};

// Ta bort to-do
let deleteTodo = (td) => {
  console.log(
    `td.parentElement.getAttribute: ${td.parentElement.getAttribute("id")}`
  );
  const id = td.parentElement.getAttribute("id");

  TodoCollection.splice(id, 1);
  localStorage.removeItem(id);
  localStorage.setItem("todos", JSON.stringify(TodoCollection));

  //td.parentElement.remove();
  //TodoCollection.splice(td.parentElement, 1);
  //localStorage.setItem("data", JSON.stringify(TodoCollection));

  ListTodos();
  new Calendar();
};

(() => {
  TodoCollection = JSON.parse(localStorage.getItem("todos")) || [];
  ListTodos();
})();

// Toggle form visibility
const createTodoLink = document.getElementById("createTodoLink");
const todoForm = document.getElementById("todoForm");
const otherElements = document.querySelectorAll(
  "main.item-b > div.main-container > div.left > div.sidebar > div.top > ul > li:not(:first-child)"
);

createTodoLink.addEventListener("click", function (event) {
  event.preventDefault();
  // todoForm.classList.toggle("hidden");

  // Toggle visibility of other elements
  for (let element of otherElements) {
    // element.classList.toggle("hidden");
  }
});
