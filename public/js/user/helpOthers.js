const nextBtn = document.querySelector('.next');
const doneBtn = document.querySelector('.done');
const personalForm = document.querySelector('.personal .form');
const requestForm = document.querySelector('.request .form');
const personalSection = document.querySelector('.personal');
const requestSection = document.querySelector('.request');
const personalInfo = {};

// next button event listener
nextBtn.addEventListener('click', (e) => {
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
  if (!fullName) {
    const errorMsg = document.createElement('span');
    errorMsg.appendChild(document.createTextNode('Please enter your full name'));
    errorMsg.classList = 'personal-err error';
    personalForm.insertBefore(errorMsg, nextBtn);
  } else if (!phoneNumber) {
    const errorMsg = document.createElement('span');
    errorMsg.appendChild(document.createTextNode('Please enter your phone number'));
    errorMsg.classList = 'personal-err error';
    personalForm.insertBefore(errorMsg, nextBtn);
  } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
    const errorMsg = document.createElement('span');
    errorMsg.appendChild(document.createTextNode('Please enter a valid phone number'));
    errorMsg.classList = 'personal-err error';
    personalForm.insertBefore(errorMsg, nextBtn);
  } else if (!email) {
    const errorMsg = document.createElement('span');
    errorMsg.appendChild(document.createTextNode('Please enter your email'));
    errorMsg.classList = 'personal-err error';
    personalForm.insertBefore(errorMsg, nextBtn);
  } else if (!(email.includes('@') && email.includes('.'))) {
    const errorMsg = document.createElement('span');
    errorMsg.appendChild(document.createTextNode('Please enter a valid email'));
    errorMsg.classList = 'personal-err error';
    personalForm.insertBefore(errorMsg, nextBtn);
  } else {
    // hide the personal form and show request form
    personalSection.classList.toggle('hide');
    requestSection.classList.toggle('hide');
  }
});
