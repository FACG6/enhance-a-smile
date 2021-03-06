const infoBtn = document.querySelectorAll('.tap--personal');
const donateBtn = document.querySelectorAll('.tap--donation');
const donateDiv = document.querySelectorAll('.cards--info-donation');
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
const mainTaps = Array.from(document.querySelectorAll('.main-tap'));
const profile = document.querySelector('.profile');
const profileA = document.querySelector('.profile-a');
const donates = document.querySelector('.donates');
const donatesA = document.querySelector('.donates-a');

profile.classList.remove('focus');
profileA.classList.remove('black');
donates.classList.add('focus');
donatesA.classList.add('black');

mainTaps[0].addEventListener('click', () => {
  if (!mainTaps[0].classList.contains('tap-focus')) {
    mainTaps[0].classList.add('tap-focus');
    mainTaps[1].classList.remove('tap-focus');
    mainTaps[2].classList.remove('tap-focus');
  }
});
mainTaps[1].addEventListener('click', () => {
  if (!mainTaps[1].classList.contains('tap-focus')) {
    mainTaps[1].classList.add('tap-focus');
    mainTaps[0].classList.remove('tap-focus');
    mainTaps[2].classList.remove('tap-focus');
  }
});
mainTaps[2].addEventListener('click', () => {
  if (!mainTaps[2].classList.contains('tap-focus')) {
    mainTaps[2].classList.add('tap-focus');
    mainTaps[1].classList.remove('tap-focus');
    mainTaps[0].classList.remove('tap-focus');
  }
});

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
    fetch('/admin/donates', {
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
  currentDonatesSection.classList.add('hide');
  doneDonatesSection.classList.add('hide');
});

currentBtn.addEventListener('click', (e) => {
  e.preventDefault();
  currentDonatesSection.classList.remove('hide');
  newDonatesSection.classList.add('hide');
  doneDonatesSection.classList.add('hide');
});

doneBtn.addEventListener('click', (e) => {
  e.preventDefault();
  doneDonatesSection.classList.remove('hide');
  newDonatesSection.classList.add('hide');
  currentDonatesSection.classList.add('hide');
});

const infoBtnArray = Array.from(infoBtn);
const donateBtnArray = Array.from(donateBtn);
const infoDivArray = Array.from(infoDiv);
const donateDivArray = Array.from(donateDiv);

infoBtnArray.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    if (!element.classList.contains('tap-focus')) {
      element.classList.add('tap-focus');
      donateBtnArray[index].classList.remove('tap-focus');
    }
    infoDivArray[index].classList.remove('hide');
    donateDivArray[index].classList.add('hide');
  });
});

donateBtnArray.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    if (!element.classList.contains('tap-focus')) {
      element.classList.add('tap-focus');
      infoBtnArray[index].classList.remove('tap-focus');
    }
    infoDivArray[index].classList.add('hide');
    donateDivArray[index].classList.remove('hide');
    const cardInfo = {
      id: element.id,
      obj: {
        current: 'current',
      },
    };
    fetch('/admin/donates', {
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
  window.location = '/admin/donates';
});
