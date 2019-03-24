const {
  pesonalSection, requestSection, personalDetails, yourRequest, streetNameSpan, requestSubmit, popUpSection, next, numberOfPiecesSpan, genderSpan, seasonSpan,
} = querySelectors(['pesonalSection', 'requestSection', 'personalDetails', 'yourRequest', 'streetNameSpan', 'requestSubmit', 'popUpSection', 'next', 'numberOfPiecesSpan', 'genderSpan', 'seasonSpan'], ['.pesonal--section', '.request--section', '.personal--details', '.your--request', '.street--name-span', '.request--submit', '.popUpBack', '.next--button', '.numberOfPiecesSpan', '.genderSpan', '.seasonSpan']);
next.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(personalDetails);
  const personalInformation = { 'personal-data': {}, 'request-data': {} };
  formData.forEach((value, key) => {
    personalInformation['personal-data'][key] = value.trim();
  });
  if (!personalInformation['personal-data'].fullName) {
    streetNameSpan.textContent = 'Full Name must not empty';
    return false;
  } if (!personalInformation['personal-data'].phoneNumber) {
    streetNameSpan.textContent = 'Phone number must not empty';
    return false;
  } if (!personalInformation['personal-data'].phoneNumber.match(/^[0-9]+$/)) {
    streetNameSpan.textContent = 'Your phone number must number';
    return false;
  } if (!personalInformation['personal-data'].cityName) {
    streetNameSpan.textContent = 'City must not empty';
    return false;
  } if (!personalInformation['personal-data'].streetName) {
    streetNameSpan.textContent = 'Street must not empty';
    return false;
  }
  pesonalSection.classList.add('hide');
  requestSection.classList.remove('request--section');
});
requestSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  const personalDetailsForm = new FormData(personalDetails);
  const personalInformation = { 'personal-data': {}, 'request-data': {} };
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
    numberOfPiecesSpan.textContent = 'add number of pieces';
  } else if (!personalInformation['request-data'].gender) {
    genderSpan.textContent = 'select one at least 1 ';
  } else if (!personalInformation['request-data'].season) {
    seasonSpan.textContent = 'select one at least 2 ';
  } else {
    fetch('/request', {
      method: 'POST',
      body: JSON.stringify(personalInformation),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
});
