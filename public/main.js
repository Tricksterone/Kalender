window.addEventListener("DOMContentLoaded", main);

// Samlar in input från formuläret för att spara i data
let TodoCollection = [];
let calendar;

function main() {
  console.log("Hi students!");
  // Init today view
  initTodosList();
  // Init calendar
  calendar = new Calendar();
  setInterval(() => {
    listDateAndTime();
  }, 1000);
}

// Display veckodag, datum och tid i header/välkomstsegmentet

function listDateAndTime() {
  const date = new Date();

  let nameOfDay = [
    "Söndag ",
    "Måndag ",
    "Tisdag ",
    "Onsdag ",
    "Torsdag ",
    "Fredag ",
    "Lördag ",
  ][new Date().getDay()];

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}/${month}-${year}`;
  var currentTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  document.getElementById("date").innerHTML =
    nameOfDay + "" + currentDate + " " + currentTime;
}
