const infoBtn = document.querySelector('.tap--personal');
const donateBtn = document.querySelector('.tap--donation');
const donateDiv = document.querySelector('.cards--info-donation');
const infoDiv = document.querySelector('.cards--info-personal');

infoBtn.addEventListener('click', (e) => {
  e.preventDefault();
  infoDiv.classList.remove('hide');
  donateDiv.classList.add('hide');
});

donateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  infoDiv.classList.add('hide');
  donateDiv.classList.remove('hide');
});
