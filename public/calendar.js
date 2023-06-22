

class Calendar {
  constructor() {
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.monthContainer = document.getElementById("calendarMonths");
    this.calendarDays = document.getElementById("calendarDays");
    this.selectedDate = undefined;

    
    this.addEventListeners();
    this.initCalendar();
  }

  async fetchRedDays() {
    try {
      const response = await fetch(
        `https://sholiday.faboul.se/dagar/v2.1/${this.currentYear}/${
          this.currentMonth + 1
        }`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch red days.");
      }
      const data = await response.json();
      console.log(data);
      const redDays = data.dagar.filter((day) => day.helgdag !== undefined);
      this.renderCalendar(redDays);
    } catch (error) {
      // console.error(error);
    }
  }

  initCalendar() {
    this.showActiveMonth();
    this.fetchRedDays();
  }

  addEventListeners() {
    const nextButton = document.querySelector("[data-cy='next-month']");
    const previousButton = document.querySelector("[data-cy='prev-month']");

    nextButton.addEventListener("click", () => this.nextMonth());
    previousButton.addEventListener("click", () => this.previousMonth());

    this.calendarDays.addEventListener("click", (event) =>
      this.selectDay(event)
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
    console.log("Total days:", totalDays);

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
      dayContainer.classList.add("day-container", "date");
      dayContainer.setAttribute("data-cy", "calendar-cell-date");

      // const dateElement = document.createElement("div");
      // dateElement.classList.add("date");
      dayContainer.textContent = i;

      dayElement.appendChild(dayContainer);
      this.calendarDays.appendChild(dayElement);

      let todoCount = this.markTodoInDate(
        this.currentYear,
        this.currentMonth,
        i
      );

      const eventElement = this.createEventElement(todoCount);
      if (eventElement) {
        eventElement.setAttribute("data-todo-count", todoCount);
        eventElement.setAttribute("data-cy", "calendar-cell-todos");
        dayElement.appendChild(eventElement);
      }

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
    }
    console.log(
      "Number of calendar cells:",
      this.calendarDays.querySelectorAll('[data-cy="calendar-cell"]').length
    );

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

  createEventElement(todoCount) {
    if (todoCount > 0) {
      const eventElement = document.createElement("div");
      eventElement.textContent = todoCount;
      return eventElement;
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

 /** @param {Event} event */
selectDay(event) {
  const clickedElement = event.target.closest(".day");
  if (clickedElement) {
    const selectedElement = this.calendarDays.querySelector(".selected");

    if (selectedElement) {
      selectedElement.classList.remove("selected");
    }

    clickedElement.classList.add("selected");

    const day = parseInt(clickedElement.innerText);
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);

    ListTodosDay(this.selectedDate);
  }
}

  highlightSelectedDay() {
    const clickedElement = event.target.closest(".day");
    if (clickedElement) {
      const selectedElement = this.calendarDays.querySelector(".selected");

      if (selectedElement) {
        selectedElement.classList.remove("selected");
      } 

      clickedElement.classList.add("selected");
    }
  }


  getTodos() {
    const storedData = localStorage.getItem("todos");
    const todos = JSON.parse(storedData);

    return todos;
  }

  markTodoInDate(currentYear, currentMonth, currentDay) {
    const todos = this.getTodos();
    if (currentMonth < 10) {
      currentMonth = `0${currentMonth + 1}`;
    }
    if (currentDay < 10) {
      currentDay = `0${currentDay}`;
    }
    const date = `${currentYear}-${currentMonth}-${currentDay}`;
    let isTodoFound = 0; // Flag to track if a matching todo is found

    if (todos != null) {
      todos.forEach((todo) => {
        if (todo.day.toString() === date.toString()) {
          isTodoFound++; // Set the flag to true if a match is found
        }
      });
      return isTodoFound; // Return the flag after the loop ends
    } else {
      return isTodoFound;
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

