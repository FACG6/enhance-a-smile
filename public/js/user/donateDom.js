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
} = querySelectors(
  [
    'personalSection',
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
  ],
  [
    '.personal',
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
  ],
);

next.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(personalForm);
  const personalInformation = {};
  formData.forEach((value, key) => {
    personalInformation[key] = value;
  });
  const {
    fullName, phoneNumber, cityName, email,
  } = personalInformation;
  if (!fullName) {
    valditMsg.textContent = 'Please enter your full name';
  } else if (!phoneNumber) {
    valditMsg.textContent = 'Please enter your phone number';
  } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
    valditMsg.textContent = 'Please enter a valid phone number';
  } else if (!cityName) {
    valditMsg.textContent = 'Please enter your city name';
  } else if (cityName.length < 2) {
    valditMsg.textContent = 'City name must be at least 3 characters';
  } else if (!email) {
    valditMsg.textContent = 'Please enter your email';
  } else if (!email) {
    valditMsg.textContent = 'Please enter your email';
  } else if (!(email.includes('@') && email.includes('.'))) {
    valditMsg.textContent = 'Please enter a valid email';
  } else {
    personalSection.classList.add('hide');
    donatSection.classList.remove('hide');
    firstTap.classList.replace('taps--peronalInfo', 'taps--donationInfo');
    secundtTap.classList.replace('taps--donationInfo', 'taps--peronalInfo');
  }
});
firstTap.addEventListener('click', (e) => {
  e.preventDefault();
  personalSection.classList.remove('hide');
  donatSection.classList.add('hide');
  firstTap.classList.replace('taps--donationInfo', 'taps--peronalInfo');
  secundtTap.classList.replace('taps--peronalInfo', 'taps--donationInfo');
  valditMsg.textContent = '';
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
    qualityVeryGood,
    qualityMedium,
    qualityLow,
    genderMen,
    genderWomen,
    genderKids,
    seasonSummer,
    seasonSpring,
    seasonWinter,
    seasonAutum,
  } = personalInformationq;
  if (
    !numberOfClothes
    || !(qualityVeryGood || qualityMedium || qualityLow)
    || !(genderMen || genderWomen || genderKids)
    || !(seasonSummer || seasonSpring || seasonWinter || seasonAutum)
  ) {
    validMsgDonation.textContent = 'All fields are required';
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
