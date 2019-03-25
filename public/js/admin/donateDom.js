const infoBtn = document.querySelectorAll('.tap--personal');
const donateBtn = document.querySelectorAll('.tap--donation');
const donateDiv = document.querySelectorAll('.cards--info-donation');
const infoDiv = document.querySelectorAll('.cards--info-personal');

const infoBtnArray = Array.from(infoBtn);
const donateBtnArray = Array.from(donateBtn);
const infoDivArray = Array.from(infoDiv);
const donateDivArray = Array.from(donateDiv);

infoBtnArray.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    infoDivArray[index].classList.remove('hide');
    donateDivArray[index].classList.add('hide');
  });
});

donateBtnArray.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    infoDivArray[index].classList.add('hide');
    donateDivArray[index].classList.remove('hide');
  });
});
