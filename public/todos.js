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
  data["text"] = title.value;
  data["day"] = dateInput.value;
  data["description"] = description.value;
  console.log(data); // För testandets skull
  createdTodoMessage();
  ListTodos();
  // Funktion att rensa formuläret/gå tillbaka till kalender-vyn?
};

const createdTodoMessage = () => {
  createdTodo.innerHTML = "Du har lagt till en to-do"
};

const ListTodos = () => {
  todos.innerHTML += `<div><span>${data.text}</span>
  <p>Datum: ${data.day}</p><br>
  <p>Beskrivning: ${data.description}</p></div`
};