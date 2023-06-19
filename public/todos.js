function initTodosList() {
  initSideBar();
  // eventlisteners för knappar
  // rendera todo listan
  //render dagens todos direkt
  window.addEventListener("resize", initSideBar);
}

function initSideBar() {
  let btn = document.querySelector("#btn");
  let sidebar = document.querySelector(".sidebar");

  btn.onclick = function () {
    sidebar.classList.toggle("active");
  };

  if (window.innerWidth <= 1140) {
    sidebar.classList.add("active");
  }
}
