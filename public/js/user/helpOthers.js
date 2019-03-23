// selecting elements from the html page
const {
  nextBtn,
  doneBtn,
  personalForm,
  requestForm,
  personalSection,
  requestSection,
  personalTab,
  requestTab,
  popUpSection,
} = querySelectors(
  [
    'nextBtn',
    'doneBtn',
    'personalForm',
    'requestForm',
    'personalSection',
    'requestSection',
    'personalTab',
    'requestTab',
    'popUpSection',
  ],
  [
    '.next',
    '.done',
    '.personal .form',
    '.request .form',
    '.personal',
    '.request',
    '.personal-info',
    '.request-info',
    '.popUpBack',
  ],
);

// objects that will have the form data
const personalInfo = {};
const requestInfo = {};

// this function shows an error message to the user
const showErrorMsg = (form, button, msg) => {
  const errorMsg = document.createElement('span');
  errorMsg.appendChild(document.createTextNode(msg));
  errorMsg.classList = 'error';
  form.insertBefore(errorMsg, button);
};

// this function sends the data to the server
const sendData = () => {
  // check for the optional fields
  if (!requestInfo.phoneNumber) requestInfo.phoneNumber = undefined;
  if (!requestInfo.description) requestInfo.description = undefined;

  // combine the steps data
  const formData = {
    'personal-details': { ...personalInfo },
    'request-details': { ...requestInfo },
  };

  // send the data to the server
  return fetch('/help-others', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
};

// the event for going to the request step
const nextEvent = (e) => {
  // checks for the error message and removes it
  const personalFormError = document.querySelector('.personal-err');
  if (personalFormError) personalForm.removeChild(personalFormError);

  // collect the data from the form
  const formData = new FormData(personalForm);
  formData.forEach((value, key) => {
    personalInfo[key] = value;
  });
  const { fullName, phoneNumber, email } = personalInfo;

  // validate the fields
  if (!fullName) showErrorMsg(personalForm, nextBtn, 'Please provide your full name');
  else if (!phoneNumber) showErrorMsg(personalForm, nextBtn, 'Please provide your phone number');
  else if (!/^[0-9]{10}$/.test(phoneNumber)) showErrorMsg(personalForm, nextBtn, 'Please provide a valid phone number');
  else if (!email) showErrorMsg(personalForm, nextBtn, 'Please provide your email');
  else if (!(email.includes('@') && email.includes('.'))) showErrorMsg(personalForm, nextBtn, 'Please provide a valid email');
  else if (!personalSection.classList.contains('hide')) {
    // hide the personal form and show request form
    personalTab.classList.replace('personal-info', 'request-info');
    requestTab.classList.replace('request-info', 'personal-info');
    personalSection.classList.toggle('hide');
    requestSection.classList.toggle('hide');
  }
};

// the event for submiting the request
const doneEvent = (e) => {
  // checks for the error message and removes it
  const requestFormError = document.querySelector('.error');
  if (requestFormError) requestForm.removeChild(requestFormError);

  // collect the data from the form
  const formData = new FormData(requestForm);
  formData.forEach((value, key) => {
    requestInfo[key] = value;
  });
  const { numOfPeople, phoneNumber, location } = requestInfo;

  // validate the fields
  if (!numOfPeople) showErrorMsg(requestForm, doneBtn, 'Please provide the number of people');
  else if (!location) showErrorMsg(requestForm, doneBtn, 'Please provide a location');
  else if (phoneNumber && !/^[0-9]{10}$/.test(phoneNumber)) showErrorMsg(requestForm, doneBtn, 'Please provide a valid phone number');
  else {
    sendData()
      .then((res) => {
        if (res.status !== 200) {
          const msg = document.querySelector('.popUp .mainParagraph');
          msg.textContent = 'There was an error with the server please check your internet connection and try again later';
          msg.classList.add('error');
          popUpSection.classList.remove('hide');
        }
        popUpSection.classList.remove('hide');
      })
      .catch((err) => {
        const msg = document.querySelector('.popUp .mainParagraph');
        msg.textContent = 'There was an error with the server please check your internet connection and try again later';
        msg.classList.add('error');
        popUpSection.classList.remove('hide');
      });
  }
};

// personal tab event listener
personalTab.addEventListener('click', (e) => {
  const personalFormError = document.querySelector('.error');
  if (personalFormError) requestForm.removeChild(personalFormError);
  personalTab.classList.replace('request-info', 'personal-info');
  requestTab.classList.replace('personal-info', 'request-info');
  if (personalSection.classList.contains('hide')) {
    personalSection.classList.toggle('hide');
    requestSection.classList.toggle('hide');
  }
});

// request tab event listener
requestTab.addEventListener('click', nextEvent);

// next button event listener
nextBtn.addEventListener('click', nextEvent);

// done button event listener
doneBtn.addEventListener('click', doneEvent);
