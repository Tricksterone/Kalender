let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", initCalendar);

function initCalendar() {
  showActiveMonth();
  addEventListeners();
  renderCalendar();
}

function addEventListeners() {
  let nextButton = document.getElementById("next");
  let previousButton = document.getElementById("prev");

  nextButton.addEventListener("click", nextMonth);
  previousButton.addEventListener("click", previousMonth);
}

function renderCalendar() {
  const calendarDays = document.getElementById("calendarDays");
  calendarDays.innerHTML = "";

  const date = new Date(currentYear, currentMonth, 1);
  let firstDay = date.getDay() - 1;
  if (firstDay === -1) {
    firstDay = 6;
  }
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Förra månaden
  const prevMonth = new Date(currentYear, currentMonth, 0);
  const prevMonthTotalDays = prevMonth.getDate();
  for (let i = firstDay; i > 0; i--) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day", "prev-date");
    const prevMonthDay = prevMonthTotalDays - i + 1;
    dayElement.textContent = prevMonthDay;
    calendarDays.appendChild(dayElement);
  }

  // Aktuella månaden
  for (let i = 1; i <= totalDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i;
    calendarDays.appendChild(dayElement);
  }

  // Nästa månad
  const lastDay = new Date(currentYear, currentMonth, totalDays).getDay();
  for (let i = 1; i <= 7 - lastDay; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day", "next-date");
    dayElement.textContent = i;
    calendarDays.appendChild(dayElement);
  }

  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    highlightCurrentDay();
  }
}

function highlightCurrentDay() {
  // Date konstruktor
  const currentDate = new Date();

  // Hämtar dag, månad, år från nuvarande datum med getDate();
  const currentDay = currentDate.getDate();
  // Lagt till månad/år med då vi förmodligen kommer behöva det

  // Letar efter element(en) representerar nuvarande dag
  const calendar = document.getElementById("calendar");
  const dayElements = calendar.getElementsByClassName("day");

  // Loopar igenom dag elementen och kollar ifall datumet matchar nuvarande datum
  // ja det är en for loop Elin ;)
  for (let i = 0; i < dayElements.length; i++) {
    const dayElement = dayElements[i];
    const day = parseInt(dayElement.innerText);

    if (day === currentDay) {
      // CSS styling för highlighten
      dayElement.style.backgroundColor = "#03204e";
      dayElement.style.color = "white";
    }
  }
}

function selectedDay(event) {
  const selectedElements = document.getElementsByClassName("selected");
  if (selectedElements.length > 0) {
    selectedElements[0].classList.remove("selected");
  }

  const clickedElement = event.target;
  clickedElement.classList.add("selected");
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("day")) {
    selectedDay(event);
  }
});

function generateMonths() {
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
}

function showActiveMonth() {
  const monthContainer = document.getElementById("calendarMonths");
  const months = generateMonths();
  monthContainer.innerHTML = months[currentMonth] + " " + currentYear;
}

function nextMonth() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showActiveMonth();
  renderCalendar();
}

function previousMonth() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showActiveMonth();
  renderCalendar();
}
