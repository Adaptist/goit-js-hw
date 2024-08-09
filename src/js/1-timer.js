// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let interval = null;

const options = {
    dateFormat: 'Y-m-d H:i',
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() - Date.now() < 0) {
            startBtn.disabled = true;
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
            });
        } else {
            startBtn.disabled = false;
        }
    },
};

const calendar = flatpickr(inputEl, options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function updateTime() {
    const selectedDate = new Date(inputEl.value);
    const currentDate = new Date();

    const gap = selectedDate - currentDate;

    const { days, hours, minutes, seconds } = convertMs(gap);

    if (gap < 0) {
        clearInterval(interval);
        return;
    }

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}

startBtn.addEventListener('click', onStart);

function onStart() {
    inputEl.disabled = true;
    startBtn.disabled = true;
    interval = setInterval(updateTime, 1000);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}