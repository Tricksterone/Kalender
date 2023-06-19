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
    const nextButton = document.getElementById("next");
    const previousButton = document.getElementById("prev");

    nextButton.addEventListener("click", () => this.nextMonth());
    previousButton.addEventListener("click", () => this.previousMonth());

    this.calendarDays.addEventListener("click", (event) =>
      this.selectedDay(event)
    );
  }

  renderCalendar(redDays) {
    this.calendarDays.innerHTML = "";

    const date = new Date(this.currentYear, this.currentMonth, 1);
    let firstDay = date.getDay() - 1;
    if (firstDay === -1) {
      firstDay = 6;
    }
    const totalDays = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    let dayElement, redDayElement, dateElement;

    for (let i = firstDay; i > 0; i--) {
      dayElement = document.createElement("div");
      dayElement.classList.add("day", "prev-date");
      const prevMonthDay = totalDays - i + 1;

      dateElement = document.createElement("div");
      dateElement.classList.add("date");
      dateElement.textContent = prevMonthDay;

      dayElement.appendChild(dateElement);
      this.calendarDays.appendChild(dayElement);
    }

    for (let i = 1; i <= totalDays; i++) {
      dayElement = document.createElement("div");
      dayElement.classList.add("day");

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
        dayContainer.appendChild(redDayElement);
      }

      dateElement = document.createElement("div");
      dateElement.classList.add("date");
      dateElement.textContent = i;

      dayContainer.appendChild(dateElement);
      dayElement.appendChild(dayContainer);
      this.calendarDays.appendChild(dayElement);
    }

    const lastDay = new Date(
      this.currentYear,
      this.currentMonth,
      totalDays
    ).getDay();

    for (let i = 1; i <= 7 - lastDay; i++) {
      dayElement = document.createElement("div");
      dayElement.classList.add("day", "next-date");

      const dayContainer = document.createElement("div");
      dayContainer.classList.add("day-container");

      dateElement = document.createElement("div");
      dateElement.classList.add("date");
      dateElement.textContent = i;

      dayContainer.appendChild(dateElement);
      dayElement.appendChild(dayContainer);
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
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const dayElements = this.calendarDays.getElementsByClassName("day");

    for (let i = 0; i < dayElements.length; i++) {
      const dayElement = dayElements[i];
      const day = parseInt(dayElement.querySelector(".date").textContent);

      if (day === currentDay) {
        dayElement.style.backgroundColor = "#03204e";
        dayElement.style.color = "white";
      }
    }
  }

  selectedDay(event) {
    const selectedElements = document.getElementsByClassName("selected");
    if (selectedElements.length > 0) {
      selectedElements[0].classList.remove("selected");
    }

    const clickedElement = event.target.closest(".day");
    if (clickedElement) {
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

document.addEventListener("DOMContentLoaded", () => {
  new Calendar();
});
