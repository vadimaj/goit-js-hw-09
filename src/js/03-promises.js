import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let step = +form.step.value;
  let amount = +form.amount.value;
  let delay = +form.delay.value;
  // console.log(delay);
  // console.log(step);
  // console.log(amount);

  for (let i = 1; i <= amount; i += 1) {
    const position = i;
    createPromise(position, delay).then(onResolve).catch(onRejected);
    delay += step;
  }
  function onResolve({ position, delay }) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
      useIcon: false,
      timeout: 10000,
    });
  }

  function onRejected({ position, delay }) {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
      useIcon: false,
      timeout: 10000,
    });
  }

  // e.currentTarget.reset();
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
