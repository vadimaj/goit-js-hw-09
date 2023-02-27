// import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minsEl: document.querySelector('[data-minutes]'),
  secsEl: document.querySelector('[data-seconds]'),
};

let selectedTime = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!isValidDate(selectedDates[0])) {
      return Notify.failure('Please choose a date in the future');
      //return alert('Please choose a date in the future');
    }
    refs.startBtn.disabled = false;
    console.log('this is valid Date');
    selectedTime = selectedDates[0].getTime();
    console.log(selectedTime);
  },
};

flatpickr('#datetime-picker', options);

function isValidDate(date) {
  return date.getTime() > Date.now();
}
// timer implementation

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;
  }
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      if (deltaTime < 1000) {
        this.stop();
      }
      const time = this.convertMs(deltaTime);

      this.onTick(time);
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  }
  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}

const timer = new Timer({ onTick: updateTimerValues });

refs.startBtn.addEventListener('click', timer.start.bind(timer));

function updateTimerValues(time) {
  refs.daysEl.textContent = `${addLeadingZero(time.days)}`;
  refs.hoursEl.textContent = `${addLeadingZero(time.hours)}`;
  refs.minsEl.textContent = `${addLeadingZero(time.minutes)}`;
  refs.secsEl.textContent = `${addLeadingZero(time.seconds)}`;
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
