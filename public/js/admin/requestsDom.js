const infoBtn = document.querySelectorAll('.tap--personal');
const donateBtn = document.querySelectorAll('.tap--request');
const donateDiv = document.querySelectorAll('.cards--info-request');
const infoDiv = document.querySelectorAll('.cards--info-personal');
const newDonatesSection = document.querySelector('.cards--new');
const currentDonatesSection = document.querySelector('.cards--current');
const doneDonatesSection = document.querySelector('.cards--done');
const newBtn = document.querySelector('.new');
const currentBtn = document.querySelector('.current');
const doneBtn = document.querySelector('.done');
const popUpSection = document.querySelector('.popUpsection');
const mainParagraph = document.querySelector('.mainParagraph');
const back = document.querySelector('.back');
const doneBtnCheck = document.querySelector('.doneBtn');

doneBtnCheck.addEventListener('click', (e) => {
  e.preventDefault();
  const checkBoxes = document.querySelectorAll('.checkBox');
  const checkBoxesArray = Array.from(checkBoxes);
  const values = [];
  checkBoxesArray.forEach((element) => {
    if (element.checked) {
      values.push(element.id);
    }
  });
  values.forEach((element) => {
    const cardInfo = {
      id: element,
      obj: {
        done: 'done',
      },
    };
    fetch('/admin/requests', {
      method: 'POST',
      body: JSON.stringify(cardInfo),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        if (result.status === 200) {
          popUpSection.classList.remove('hide');
        } else {
          popUpSection.classList.remove('hide');
          mainParagraph.textContent = 'Something went wrong try againe';
        }
      })
      .catch(() => {
        popUpSection.classList.remove('hide');
        mainParagraph.textContent = 'Something went wrong try againe';
      });
  });
});

newBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newDonatesSection.classList.remove('hide');
  newBtn.classList.add('new');
  currentBtn.classList.remove('new');
  doneBtn.classList.remove('new');
  currentDonatesSection.classList.add('hide');
  doneDonatesSection.classList.add('hide');
});

currentBtn.addEventListener('click', (e) => {
  e.preventDefault();
  currentDonatesSection.classList.remove('hide');
  currentBtn.classList.add('new');
  newBtn.classList.remove('new');
  doneBtn.classList.remove('new');
  newDonatesSection.classList.add('hide');
  doneDonatesSection.classList.add('hide');
});

doneBtn.addEventListener('click', (e) => {
  e.preventDefault();
  doneDonatesSection.classList.remove('hide');
  newDonatesSection.classList.add('hide');
  currentDonatesSection.classList.add('hide');
  currentBtn.classList.remove('new');
  newBtn.classList.remove('new');
  doneBtn.classList.add('new');
});

const infoBtnArray = Array.from(infoBtn);
const donateBtnArray = Array.from(donateBtn);
const infoDivArray = Array.from(infoDiv);
const donateDivArray = Array.from(donateDiv);

infoBtnArray.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    infoDivArray[index].classList.remove('hide');
    donateDivArray[index].classList.add('hide');
    element.classList.add('selected');
    donateBtnArray[index].classList.remove('selected');
  });
});
donateBtnArray.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    infoDivArray[index].classList.add('hide');
    donateDivArray[index].classList.remove('hide');
    element.classList.add('selected');
    infoBtnArray[index].classList.remove('selected');
    const cardInfo = {
      id: element.id,
      obj: {
        current: 'current',
      },
    };
    fetch('/admin/requests', {
      method: 'POST',
      body: JSON.stringify(cardInfo),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        if (result.status !== 200) {
          popUpSection.classList.remove('hide');
          mainParagraph.textContent = 'Something went wrong try againe';
        }
      })
      .catch(() => {
        popUpSection.classList.remove('hide');
        mainParagraph.textContent = 'Something went wrong try againe';
      });
  });
});

back.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = '/admin/requests';
});
