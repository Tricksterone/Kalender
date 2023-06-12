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
