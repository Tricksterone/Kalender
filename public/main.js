window.addEventListener("DOMContentLoaded", main);

// Samlar in input från formuläret för att spara i data
let TodoCollection = [];

function main() {
  console.log("Hi students!");
  // Init today view
  initTodosList();
  // Init calendar
  new Calendar();
}
