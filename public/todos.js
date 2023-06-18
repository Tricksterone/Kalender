const form = document.getElementById("form"),
title = document.getElementById("titleInput"),
errorMsgTitle = document.getElementById("error-message-title"),
errorMsgDate = document.getElementById("error-message-date")
dateInput = document.getElementById("dateInput"),
description = document.getElementById("textInput");

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
  }
  else{
    errorMsgTitle.innerHTML = "";
    errorMsgDate.innerHTML = "";
    acceptData();
  }
}

const data = {}
const acceptData = () => {
  data["text"] = title.value;
  data["day"] = dateInput.value;
  data["description"] = description.value;
  console.log(data);
};