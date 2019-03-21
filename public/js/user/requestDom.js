const {
  pesonalSection, requestSection,
  personalDetails, yourRequest, fullNameSpan, phoneNumberSpan, cityNameSpan, streetNameSpan, requestSubmit, popUpSection, next,
} = querySelectors(['pesonalSection', 'requestSection', 'personalDetails', 'yourRequest', 'fullNameSpan', 'phoneNumberSpan', 'cityNameSpan', 'streetNameSpan', 'requestSubmit', 'popUpSection', 'next'], ['.pesonal--section', '.request--section', '.personal--details', '.your--request', '.full--name-span', '.phone--number-span', '.city--name-span', '.street--name-span', '.request--submit', '.popUpBack', '.next--button']);
// const season = document.querySelector('[name = season]');
next.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(personalDetails);
  const personalInformation = { 'personal-data': {}, 'request-data': {} };
  formData.forEach((value, key) => {
    personalInformation['personal-data'][key] = value.trim();
  });
  if (!personalInformation['personal-data'].fullName) {
    fullNameSpan.textContent = 'must not empty';
    return false;
  } if (!personalInformation['personal-data'].phoneNumber) {
    phoneNumberSpan.textContent = 'must not empty';
    return false;
  } if (!personalInformation['personal-data'].phoneNumber.match(/^[0-9]+$/)) {
    phoneNumberSpan.textContent = 'Your phone number not valid';
    return false;
  } if (!personalInformation['personal-data'].cityName) {
    cityNameSpan.textContent = 'must not empty';
    return false;
  } if (!personalInformation['personal-data'].streetName) {
    streetNameSpan.textContent = 'must not empty';
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
  fetch('/request', {
    method: 'POST',
    body: JSON.stringify(personalInformation),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });
});
