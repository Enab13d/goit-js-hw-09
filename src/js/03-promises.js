import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');

let amount = null;
let delay = null;
let step = null;
let invokeCounter = 0;
let position = invokeCounter + 1;
const onSubmit = e => {
  e.preventDefault();
  amount = Number(e.currentTarget.elements.amount.value);
  delay = Number(e.currentTarget.elements.delay.value);
  step = Number(e.currentTarget.elements.step.value);
  setTimeout(() => {
    setInterval(() => {
      if (invokeCounter === amount) {
        return;
      }
      createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
      invokeCounter += 1;
      position = invokeCounter + 1;
      delay += step;
    }, step);
  }, delay);
  resetCounter();
};
form.addEventListener('submit', onSubmit);
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
};
function resetCounter() {
  invokeCounter = 0;
  position = invokeCounter + 1;
};
