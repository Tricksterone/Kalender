const form = document.getElementById("form"),
title = document.getElementById("titleInput"),
errorMsgTitle = document.getElementById("error-message-title"),
errorMsgDate = document.getElementById("error-message-date")
dateInput = document.getElementById("dateInput"),
description = document.getElementById("textInput"),
createdTodo = document.getElementById("created-todo"),
todos = document.getElementById("show-todos");

function initTodosList() {
  initSideBar();
  // eventlisteners för knappar
  // rendera todo listan
  //render dagens todos direkt
}

function initSideBar() {
  let btn = document.querySelector("#btn");
  let sidebar = document.querySelector(".sidebar");

  btn.onclick = function () {
    sidebar.classList.toggle("active");
  };
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  formValidation();
})

const formValidation = () => {
  if(title.value === ""){
    errorMsgTitle.innerHTML = "Du måste skriva in en titel";
  }
  else if(dateInput.value === ""){
    errorMsgDate.innerHTML = "Du måste välja ett datum!"
    errorMsgTitle.innerHTML = "";
  }
  else{
    errorMsgTitle.innerHTML = "";
    errorMsgDate.innerHTML = "";
    collectData();
  }
}

// Samlar in input från formuläret för att spara i data
const data = {}
const collectData = () => {
  data["title"] = title.value;
  data["day"] = dateInput.value;
  data["description"] = description.value;
  console.log(data); // För testandets skull
  createdTodoMessage();
  ListTodos();
};

const createdTodoMessage = () => {
  createdTodo.innerHTML = "Du har lagt till en to-do";
  resetForm();
  // Gå tillbaka till kalendervyn-funktion?
};

const ListTodos = () => {
  todos.innerHTML += `<div><span>${data.title}</span>
  <p>Datum: ${data.day}</p>
  <p>Beskrivning: ${data.description}</p>
  <i onClick="deleteTodo(this)" class="fa-solid fa-trash" style="color: #3d4657;"></i>
  <i onClick="editTodo(this)" class="fa-solid fa-pen-to-square" style="color: #2b384f;"></i>
  </div>`
};

const resetForm =  () => {
  title.value = "";
  dateInput.value = "";
  description.value = "";
};

// Uppdatera to-do
const editTodo = (td) => {
  const selectedTodo = td.parentElement;

  title.value = selectedTodo.children[0].innerHTML;
  dateInput.value = selectedTodo.children[1].innerHTML;
  description.value = selectedTodo.children[2].innerHTML;

  selectedTodo.remove();
};

// Ta bort to-do
let deleteTodo = (td) => {
  td.parentElement.remove();
}