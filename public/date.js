let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function initCalendar() {
  showActiveMonth();
  highlightCurrentDay();
}

function renderCalendar() {
  // 1. Hämta den först dagen i den aktiva månaden.
  const date = new Date(currentYear, currentMonth, 1);
  // 2. Vilken veckodag är det?
  const weekday = date.getDay(); // 1 = Måndag, 2 = Tisdag, 3 = Onsdag, 4 = Torsdag, 5 = Fredag, 6 = Lördag, 0 = Söndag
  // 3. Skapa tomma divar för att fylla ut veckan.
  // for (let i = 0)
  // 4. Hur många dagar har månaden?
  // 5. Skapa divar med dag i.
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
  var monthContainer = document.getElementById("calendarMonths");
  var months = generateMonths();
  monthContainer.innerHTML = months[currentMonth] + " " + currentYear;
}

function nextMonth() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showActiveMonth();
}

function previousMonth() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showActiveMonth();
}
