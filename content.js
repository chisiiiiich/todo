const weekdays = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота"
];
const months = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря"
]; 

const eventsArr = [];
getEvents();


const today = document.querySelector(".weekdays"),
todayDateTime = document.querySelector(".today");

const addButton = document.querySelector(".add-event");

const 
dateInput = document.querySelector(".date-input"),
eventsContainer = document.querySelector(".events"),
addEventBtn = document.querySelector(".add-event"),
addEventWrapper = document.querySelector(".add-event-wrapper "),
addEventCloseBtn = document.querySelector(".close "),
addEventTitle = document.querySelector(".event-name "),
addEventFrom = document.querySelector(".event-time-from "),
addEventTo = document.querySelector(".event-time-to "),
addEventSubmit = document.querySelector(".add-event-btn ");


var d = new Date();

var n = d.getDay(),
month = d.getMonth(),
year = d.getFullYear(),
time = d.getHours(),
minute = d.getMinutes(),
day = d.getDate();


function todayActive() {
todayDateTime.innerHTML = '<div>'+"Сегодня  "+day+" "+months[month] +" "+year +" "+time+":"+minute+'</div>'


for (var i=0;i<7;i++){
  if (i!=n){
  today.innerHTML += '<p>' + weekdays[i]+'</p>';
}
  if (i==n) {
      today.innerHTML += '<p class="active-weekday">' + weekdays[n]+'</p>';
  }
}
activeDay=day;
updateEvents(day);
}

todayActive();
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        event.events.forEach((event) => {
          events += `<div class="event">
              <div class="title">
              <input class="check" type="checkbox"> <h3 class="event-title">${event.title}</h3> 
              </div>
             Нажми для удаления
          </div>`;
        });
    });
    if (events === "") {
      events = `<div class="no-event">
              <h3>Нет событий</h3>
          </div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
  }
  
  
  addEventBtn.addEventListener("click", () => {
    addEventWrapper.classList.toggle("active");
  });
  
  addEventCloseBtn.addEventListener("click", () => {
    addEventWrapper.classList.remove("active");
  });
  
  document.addEventListener("click", (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
      addEventWrapper.classList.remove("active");
    }
  });
  
  
  addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
  });
  
  
  
  
  addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    if (eventTitle === "") {
      alert("Введите текст");
      return;
    }
  
  
    let eventExist = false;
    eventsArr.forEach((event) => {
        event.events.forEach((event) => {
          if (event.title === eventTitle) {
            eventExist = true;
          }
        });
      }
    );
    const newEvent = {
      title: eventTitle,
    };
    let eventAdded = false;
    if (eventsArr.length > 0) {
      eventsArr.forEach((item) => {
          item.events.push(newEvent);
          eventAdded = true;
        }
      );
    }
  
    if (!eventAdded) {
      eventsArr.push({
        events: [newEvent],
      });
    }
  
    addEventWrapper.classList.remove("active");
    addEventTitle.value = "";
    updateEvents(activeDay);
    const activeDayEl = document.querySelector(".weekdays .active-weekday");
    if (!activeDayEl.classList.contains("event")) {
      activeDayEl.classList.add("event");
    }
  });
  
  
  eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
      if (confirm("Вы хотите удалить событие?")) {
        const eventTitle = e.target.children[0].children[1].innerHTML;
        eventsArr.forEach((event) => {

            event.events.forEach((item, index) => {
              if (item.title === eventTitle) {
                event.events.splice(index, 1);
              }
            });
            if (event.events.length === 0) {
              eventsArr.splice(eventsArr.indexOf(event), 1);
              const activeDayEl = document.querySelector(".weekdays .active-weekday");
              if (activeDayEl.classList.contains("event")) {
                activeDayEl.classList.remove("event");
              }
            }
          
        });
        updateEvents(activeDay);
      }
    }
  });
  
  
  function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
  }
  
  
  function getEvents() {
    if (localStorage.getItem("events") === null) {
      return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
  }