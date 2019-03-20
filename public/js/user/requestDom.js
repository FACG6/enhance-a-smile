const {
  pesonalSection, requestSection,
  personalDetails, yourRequest, fullNameSpan, phoneNumberSpan, cityNameSpan, streetNameSpan, requestSubmit, popUpSection, next,
} = querySelectors(['pesonalSection', 'requestSection', 'personalDetails', 'yourRequest', 'fullNameSpan', 'phoneNumberSpan', 'cityNameSpan', 'streetNameSpan', 'requestSubmit', 'popUpSection', 'next'], ['.pesonal--section', '.request--section', '.personal--details', '.your--request', '.full--name-span', '.phone--number-span', '.city--name-span', '.street--name-span', '.request--submit', '.popUpBack', '.next--button']);
const season = document.querySelector('[name = season]');
next.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(personalDetails);
  const personalInformation = {};
  formData.forEach((value, key) => {
    personalInformation[key] = value.trim();
  });
  if (!personalInformation.fullName) {
    fullNameSpan.textContent = 'must not empty';
    return false;
  } if (!personalInformation.phoneNumber) {
    phoneNumberSpan.textContent = 'must not empty';
    return false;
  } if (!personalInformation.phoneNumber.match(/^[0-9]+$/)) {
    phoneNumberSpan.textContent = 'Your phone number not valid';
    return false;
  } if (!personalInformation.cityName) {
    cityNameSpan.textContent = 'must not empty';
    return false;
  } if (!personalInformation.streetName) {
    streetNameSpan.textContent = 'must not empty';
    return false;
  }
  pesonalSection.classList.add('hide');
  requestSection.classList.remove('request--section');
});
requestSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const personalDetailsForm = new FormData(personalDetails);
  const personalInformation = {};
  personalDetailsForm.forEach((value, key) => {
    personalInformation[key] = value.trim();
  });
  const yourRequestForm = new FormData(yourRequest);
  yourRequestForm.forEach((value, key) => {
    personalInformation[key] = value;
  });
  fetch('/request', {
    method: 'POST',
    body: JSON.stringify(personalInformation),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  window.location = '/';
});
