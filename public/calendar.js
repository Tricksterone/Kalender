class Calendar {
  constructor() {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.monthContainer = document.getElementById("calendarMonths");
    this.calendarDays = document.getElementById("calendarDays");

    this.initCalendar();
  }

  async fetchRedDays() {
    try {
      const response = await fetch(
        `https://api.dryg.net/dagar/v2.1/${this.currentYear}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch red days.");
      }
      const data = await response.json();
      const redDays = data.dagar.filter((day) => day.helgdag !== undefined);
      this.renderCalendar(redDays);
    } catch (error) {
      console.error(error);
    }
  }

  initCalendar() {
    this.showActiveMonth();
    this.addEventListeners();
    this.fetchRedDays();
  }

  addEventListeners() {
    const nextButton = document.querySelector("[data-cy='next-month']");
    const previousButton = document.querySelector("[data-cy='prev-month']");

    nextButton.addEventListener("click", () => this.nextMonth());
    previousButton.addEventListener("click", () => this.previousMonth());

    this.calendarDays.addEventListener("click", (event) =>
      this.selectedDay(event)
    );
  }

  renderCalendar(redDays) {
    this.calendarDays.innerHTML = "";

    const date = new Date(this.currentYear, this.currentMonth, 1);
    const firstDay = (date.getDay() + 6) % 7;
    const totalDays = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    let dayElement, redDayElement, dateElement;

    // Skapar tomma celler innan aktuell månad
    for (let i = 0; i < firstDay; i++) {
      dayElement = document.createElement("div");
      dayElement.classList.add("day", "empty-date");
      dayElement.setAttribute("data-cy", "calendar-cell");

      this.calendarDays.appendChild(dayElement);
    }

    // Aktuella månadens dagar
    for (let i = 1; i <= totalDays; i++) {
      dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.setAttribute("data-cy", "calendar-cell");

      const dayContainer = document.createElement("div");
      dayContainer.classList.add("day-container");

      redDayElement = this.createRedDayElement(
        i,
        this.currentMonth,
        this.currentYear,
        redDays
      );
      if (redDayElement) {
        redDayElement.classList.add("red-day");
        redDayElement.setAttribute("data-cy", "calendar-cell-holiday");
        dayContainer.appendChild(redDayElement);
      }

      dateElement = document.createElement("div");
      dateElement.classList.add("date");
      dateElement.textContent = i;
      dateElement.setAttribute("data-cy", "calendar-cell-date");

      const dateContainer = document.createElement("div");
      dateContainer.classList.add("date-container");
      dateContainer.appendChild(dateElement);

      dayContainer.appendChild(dateElement);
      dayElement.appendChild(dayContainer);
      this.calendarDays.appendChild(dayElement);
    }

    // Räknar ut antalet dagar efter aktuell månad
    const remainingEmptyCells = (7 - ((firstDay + totalDays) % 7)) % 7;

    // Renderar månaden efter
    for (let i = 0; i < remainingEmptyCells; i++) {
      dayElement = document.createElement("div");
      dayElement.classList.add("day", "empty-date");
      dayElement.setAttribute("data-cy", "calendar-cell");

      this.calendarDays.appendChild(dayElement);
    }

    if (
      this.currentMonth === new Date().getMonth() &&
      this.currentYear === new Date().getFullYear()
    ) {
      this.highlightCurrentDay();
    }
  }

  createRedDayElement(day, month, year, redDays) {
    const matchedDay = redDays.find(
      (redDay) =>
        redDay["datum"].substring(8, 10) === String(day).padStart(2, "0") &&
        redDay["datum"].substring(5, 7) === String(month + 1).padStart(2, "0")
    );

    if (matchedDay) {
      const redDayElement = document.createElement("div");
      redDayElement.textContent = matchedDay["helgdag"];
      redDayElement.classList.add("red-day-text");
      return redDayElement;
    }
    return null;
  }

  highlightCurrentDay() {
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

  selectedDay(event) {
    const clickedElement = event.target.closest(".day");

    if (clickedElement) {
      const selectedElement = this.calendarDays.querySelector(".selected");

      if (selectedElement) {
        selectedElement.classList.remove("selected");
      }

      clickedElement.classList.add("selected");
    }
  }

  showActiveMonth() {
    const months = this.generateMonths();
    this.monthContainer.innerHTML =
      months[this.currentMonth] + " " + this.currentYear;
  }

  generateMonths() {
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

  nextMonth() {
    this.currentYear =
      this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    this.currentMonth = (this.currentMonth + 1) % 12;
    this.showActiveMonth();
    this.fetchRedDays();
  }

  previousMonth() {
    this.currentYear =
      this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    this.currentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    this.showActiveMonth();
    this.fetchRedDays();
  }
}
