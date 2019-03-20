const personalSection = document.querySelector('.personal');
const personalForm = document.querySelector('.personal--form');
const next = document.querySelector('.next');
const donatSection = document.querySelector('.donation');
const donationForm = document.querySelector('.donation--form');
const done = document.querySelector('.submit');
const popUpSection = document.querySelector('.popUpBack');
const back = document.querySelector('.back');
const firstTap = document.querySelector('.taps--peronalInfo');
const secundtTap = document.querySelector('.taps--donationInfo');

next.addEventListener('click', (e) => {
  e.preventDefault();
  personalSection.classList.add('hide');
  donatSection.classList.remove('hide');
  firstTap.classList.replace('taps--peronalInfo', 'taps--donationInfo');
  secundtTap.classList.replace('taps--donationInfo', 'taps--peronalInfo');
});

done.addEventListener('click', (e) => {
  e.preventDefault();
  const farmData2 = new FormData(personalForm);
  const personalInformation = {};
  farmData2.forEach((value, key) => {
    personalInformation[key] = value;
  });
  const farmData = new FormData(donationForm);
  farmData.forEach((value, key) => {
    personalInformation[key] = value;
  });
  popUpSection.classList.remove('hide');
  fetch('/donate', {
    method: 'POST',
    body: JSON.stringify(personalInformation),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

back.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = '/';
});
