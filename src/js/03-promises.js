import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);
function onSubmit(e) {
  e.preventDefault();
  let {
    elements: { delay, step, amount },
  } = e.currentTarget;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);
  for (let i = 1; i <= amount; i++) {
    let position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
