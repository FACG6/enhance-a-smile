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

const doneBtnCheck = document.querySelector('.doneBtn'); // the btn for the done to convert from current to done

doneBtnCheck.addEventListener('click', (e) => {
  e.preventDefault();
  const checkBoxes = document.querySelectorAll('.checkBox'); // select all checkbox input as nodelist
  // const doneBtnCheckValue = checkBoxes.value; // take the value of the checkboxes
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
    }).then(res => console.log(res))
      .catch(er => console.log(er));
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
    infoDivArray[index].classList.remove('hide');
    donateDivArray[index].classList.add('hide');
  });
});

donateBtnArray.forEach((element, index) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    infoDivArray[index].classList.add('hide');
    donateDivArray[index].classList.remove('hide');
    const cardInfo = {
      id: element.id,
      obj: {
        current: 'current',
      },
    };
    console.log(11111111111111, cardInfo);
    fetch('/admin/donates', {
      method: 'POST',
      body: JSON.stringify(cardInfo),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => result.json)
      .then(res => console.log(99999999999999, res))
      .catch(Er => console.log(888888888888, Er));
  });
});
