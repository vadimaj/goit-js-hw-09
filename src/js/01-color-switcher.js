const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let timerId = null;
refs.stopBtn.disabled = true;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStoptBtnClick);

function onStartBtnClick() {
  timerId = setInterval(changeBodyColor, 1000);
  toggleBtnsState();
}

function onStoptBtnClick() {
  clearInterval(timerId);
  toggleBtnsState();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function toggleBtnsState() {
  if (refs.startBtn.disabled) {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  } else {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }
}
