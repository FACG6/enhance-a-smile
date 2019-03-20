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
const valditMsg = document.querySelector('.validMsg');
const validMsgDonation = document.querySelector('.validMsgDonation');

next.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(personalForm);
  const personalInformation = {};
  formData.forEach((value, key) => {
    personalInformation[key] = value;
  });
  if (!personalInformation.fullName || !personalInformation.phoneNumber || !personalInformation.cityName || !personalInformation.email) {
    valditMsg.textContent = 'All fiels is required';
  } else {
    personalSection.classList.add('hide');
    donatSection.classList.remove('hide');
    firstTap.classList.replace('taps--peronalInfo', 'taps--donationInfo');
    secundtTap.classList.replace('taps--donationInfo', 'taps--peronalInfo');
  }
});

done.addEventListener('click', (e) => {
  e.preventDefault();
  const formDatavalid = new FormData(donationForm);
  const personalInformationq = {};
  formDatavalid.forEach((value, key) => {
    personalInformationq[key] = value;
  });
  if (!personalInformationq.numberOfClothes || !(personalInformationq.veryGood || personalInformationq.medium || personalInformationq.low) || !(personalInformationq.men || personalInformationq.women || personalInformationq.kids) || !(personalInformationq.summer || personalInformationq.spring || personalInformationq.winter || personalInformationq.autum)) {
    validMsgDonation.textContent = 'All fiels rqured';
  } else {
    const formData2 = new FormData(personalForm);
    const personalInformation = {};
    formData2.forEach((value, key) => {
      personalInformation[key] = value;
    });
    const formData = new FormData(donationForm);
    formData.forEach((value, key) => {
      personalInformation[key] = value;
    });
    fetch('/donate', {
      method: 'POST',
      body: JSON.stringify(personalInformation),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => result.json())
      .then((serverRes) => {
        if (serverRes.msg === 'donation added sucsesfully') {
          popUpSection.classList.remove('hide');
        }
      })
      .catch(err => console.log(err));
  }
});

back.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = '/';
});
