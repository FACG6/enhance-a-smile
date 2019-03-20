const {
  personalSection,
  personalForm,
  next,
  donatSection,
  donationForm,
  done,
  popUpSection,
  back,
  firstTap,
  secundtTap,
  valditMsg,
  validMsgDonation,
} = querySelectors(['personalSection',
  'personalForm',
  'next',
  'donatSection',
  'donationForm',
  'done',
  'popUpSection',
  'back',
  'firstTap',
  'secundtTap',
  'valditMsg',
  'validMsgDonation',
], ['.personal',
  '.personal--form',
  '.next',
  '.donation',
  '.donation--form',
  '.submit',
  '.popUpBack',
  '.back',
  '.taps--peronalInfo',
  '.taps--donationInfo',
  '.validMsg',
  '.validMsgDonation',
]);

next.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(personalForm);
  const personalInformation = {};
  formData.forEach((value, key) => {
    personalInformation[key] = value;
  });
  const {
    fullName,
    phoneNumber,
    cityName,
    email,
  } = personalInformation;
  if (!fullName || !phoneNumber || !cityName || !email) {
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
  const {
    numberOfClothes,
    veryGood,
    medium,
    low,
    men,
    women,
    kids,
    summer,
    spring,
    winter,
    autum,
  } = personalInformationq;
  if (!numberOfClothes || !(veryGood || medium || low) || !(men || women || kids) || !(summer || spring || winter || autum)) {
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
