function initHighlightCurrentDay() {
  highlightCurrentDay();
  generateMonths();
  showMonths();
  selectedDay();
}

function highlightCurrentDay() {
  // Date konstruktor
  const currentDate = new Date();

  // Hämtar dag, månad, år från nuvarande datum med getDate();
  const currentDay = currentDate.getDate();
  // Lagt till månad/år med då vi förmodligen kommer behöva det
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

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

function selectedDay() {
  const selectedElements = document.getElementsByClassName("selected");
  if (selectedElements.length > 0) {
    selectedElements[0].classList.remove("selected");
  }

  const clickedElement = event.target;
  clickedElement.classList.add("selected");
}
// Vill vi ha denna månaderna separata från dagarna??
function generateMonths() {
  var calendar = document.getElementById("calendar");
  var lang = calendar.getAttribute("data-lang");

  var months = [
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

  return months;
}

function showMonths() {
  var monthContainer = document.getElementById("calendarMonths");
  var currentMonth = new Date().getMonth();
  var currentYear = new Date().getFullYear();

  var months = generateMonths();
  monthContainer.innerHTML = months[currentMonth] + " " + currentYear;
}
