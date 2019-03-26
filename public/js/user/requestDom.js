const {
  pesonalSection,
  requestSection,
  personalDetails,
  yourRequest,
  streetNameSpan,
  requestSubmit,
  popUpSection,
  next,
  validMsgSpan,
  back,
  firstTab,
  secondTab,
} = querySelectors(
  [
    'pesonalSection',
    'requestSection',
    'personalDetails',
    'yourRequest',
    'streetNameSpan',
    'requestSubmit',
    'popUpSection',
    'next',
    'validMsgSpan',
    'back',
    'firstTab',
    'secondTab',
  ],
  [
    '.pesonal--section',
    '.request--section',
    '.personal--details',
    '.your--request',
    '.street--name-span',
    '.request--submit',
    '.popUpBack',
    '.next--button',
    '.valid--msg-span',
    '.back',
    '.nav--form-personalDetails',
    '.nav--form-yourRequest',
  ],
);

const nextEvent = (e) => {
  e.preventDefault();
  const formData = new FormData(personalDetails);
  const personalInformation = {
    'personal-data': {},
    'request-data': {},
  };
  formData.forEach((value, key) => {
    personalInformation['personal-data'][key] = value.trim();
  });
  if (!personalInformation['personal-data'].fullName) {
    streetNameSpan.textContent = 'Full Name must not empty';
    return false;
  }
  if (!personalInformation['personal-data'].phoneNumber) {
    streetNameSpan.textContent = 'Phone number must not empty';
    return false;
  }
  if (!personalInformation['personal-data'].phoneNumber.match(/^[0-9]{10}$/)) {
    streetNameSpan.textContent = 'Please enter a valid phone number';
    return false;
  }
  if (!personalInformation['personal-data'].cityName) {
    streetNameSpan.textContent = 'City must not empty';
    return false;
  }
  if (!personalInformation['personal-data'].streetName) {
    streetNameSpan.textContent = 'Street must not empty';
    return false;
  }
  pesonalSection.classList.add('hide');
  requestSection.classList.remove('hide');
  firstTab.classList.replace('nav--form-personalDetails', 'nav--form-yourRequest');
  secondTab.classList.replace('nav--form-yourRequest', 'nav--form-personalDetails');
};
next.addEventListener('click', nextEvent);
firstTab.addEventListener('click', (e) => {
  pesonalSection.classList.remove('hide');
  requestSection.classList.add('hide');
  firstTab.classList.replace('nav--form-yourRequest', 'nav--form-personalDetails');
  secondTab.classList.replace('nav--form-personalDetails', 'nav--form-yourRequest');
});
secondTab.addEventListener('click', nextEvent);

requestSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  validMsgSpan.textContent = '';
  const personalDetailsForm = new FormData(personalDetails);
  const personalInformation = {
    'personal-data': {},
    'request-data': {},
  };
  personalDetailsForm.forEach((value, key) => {
    personalInformation['personal-data'][key] = value.trim();
  });
  const yourRequestForm = new FormData(yourRequest);
  const genders = [];
  const seasons = [];
  yourRequestForm.forEach((value, key) => {
    if (key === 'kids' || key === 'women' || key === 'men') {
      genders.push(key);
      personalInformation['request-data'].gender = genders;
    } else if (key === 'winter' || key === 'summer' || key === 'spring' || key === 'autumn') {
      seasons.push(key);
      personalInformation['request-data'].season = seasons;
    } else {
      personalInformation['request-data'][key] = value;
    }
  });
  if (!personalInformation['request-data'].numberOfPieces) {
    validMsgSpan.textContent = 'add number of pieces';
  } else if (!personalInformation['request-data'].gender) {
    validMsgSpan.textContent = 'select one at least from gender ';
  } else if (!personalInformation['request-data'].season) {
    validMsgSpan.textContent = 'select one at least from season ';
  } else {
    fetch('/request', {
      method: 'POST',
      body: JSON.stringify(personalInformation),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => result.json())
      .then((res) => {
        if (res.msg === 'Your request added sucsesfully') {
          popUpSection.classList.remove('hide');
        } else if (res.msg === 'error in add the request information') {
          document.querySelector('.mainParagraph').textContent = 'There was an error with the server please check your internet connection and try again later';
          popUpSection.classList.remove('hide');
        } else {
          validMsgSpan.textContent = res.msg;
        }
      })
      .catch((err) => {
        document.querySelector('.mainParagraph').textContent = 'There was an error with the server please check your internet connection and try again later';
        popUpSection.classList.remove('hide');
      });
  }
});

back.addEventListener('click', (e) => {
  e.preventDefault();
  window.location = '/';
});
