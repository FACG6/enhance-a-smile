// const personalDetails = document.querySelector('.personal--details');
const next = document.querySelector('.next--button');
const {
  pesonalSection, requestSection,
  personalDetails, yourRequest, fullNameSpan, phoneNumberSpan, cityNameSpan, streetNameSpan, requestSubmit,
} = querySelectors(['pesonalSection', 'requestSection', 'personalDetails', 'yourRequest', 'fullNameSpan', 'phoneNumberSpan', 'cityNameSpan', 'streetNameSpan', 'requestSubmit'], ['.pesonal--section', '.request--section', '.personal--details', '.your--request', '.full--name-span', '.phone--number-span', '.city--name-span', '.street--name-span', '.request--submit']);

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
  const formData = new FormData(personalDetails);
  const personalInformation = {};
  formData.forEach((value, key) => {
    personalInformation[key] = value.trim();
  });
  const formData2 = new FormData(yourRequest);
  console.log(formData2);
  formData2.forEach((value, key) => {
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
