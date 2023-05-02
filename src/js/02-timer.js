import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  inputEl: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysOutput: document.querySelector('span[data-days]'),
  hoursOutput: document.querySelector('span[data-hours]'),
  minutesOutput: document.querySelector('span[data-minutes]'),
  secondsOutput: document.querySelector('span[data-seconds]'),
};
refs.startBtn.setAttribute('disabled', true);
const alertMsg = 'Please choose a date in the future';
let currentDate = null;
let chosenDate = null;
let deltaTime = null;
let isDateChosen = false;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0].getTime();
    currentDate = new Date().getTime();
    if (chosenDate <= currentDate) {
      Notify.failure(alertMsg);
      return;
    }
    isDateChosen = true;
    refs.startBtn.removeAttribute('disabled');
  },
};
flatpickr(refs.inputEl, options);
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function timerStart() {
  currentDate = new Date().getTime();
  if (!isDateChosen || chosenDate <= currentDate) {
    return;
  }
  refs.startBtn.setAttribute('disabled', true);
  refs.inputEl.setAttribute('disabled', true);
  const intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    deltaTime = chosenDate - currentDate;
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      refs.inputEl.removeAttribute('disabled');
      refs.startBtn.removeAttribute('disabled');
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.daysOutput.textContent = days;
    refs.hoursOutput.textContent = hours;
    refs.minutesOutput.textContent = minutes;
    refs.secondsOutput.textContent = seconds;
  }, 1000);
}

refs.startBtn.addEventListener('click', timerStart);
