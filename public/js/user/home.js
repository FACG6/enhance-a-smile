/* eslint-disable no-undef */
const {
  formContactUs, registerEmail, popup, popupMassage, poppUpDone,
} = querySelectors(
  ['formContactUs', 'registerEmail', 'popup', 'popupMassage', 'poppUpDone'],
  [
    '.footer--contactUs-form',
    '.footer--form',
    '.popup',
    '.popup--content-message',
    '.popup--content-Done',
  ],
);

const { inputsContactUs, emailRegisterInput } = querySelectorsAll(
  ['inputsContactUs', 'emailRegisterInput'],
  ['.footer-inputs', '.footer--form-registerEmail.footer-inputs'],
);

formContactUs.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formContactUs);
  const dataContactUs = {};
  formData.forEach((value, key) => {
    dataContactUs[key] = value;
  });
  const { email, fullName, message } = dataContactUs;
  if (!email || !validateEamil(email) || !fullName || !message) {
    popup.classList.add('popup-show');
    popupMassage.innerText = 'Please enter a valid values';
    return false;
  }
  fetch('/contact-us', {
    method: 'POST',
    body: JSON.stringify(dataContactUs),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then((res) => {
      if (res.msg === 'done') {
        popup.classList.add('popup-show');
        popupMassage.innerText = 'We received your message, we will send you our response soon.';
        innerTextRemove(Array.from(inputsContactUs).slice(0, 3));
      }
    });
  return true;
});

registerEmail.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(registerEmail);
  const dataregisterEmail = {};
  formData.forEach((value, key) => {
    dataregisterEmail[key] = value;
  });
  const { email } = dataregisterEmail;
  if (!validateEamil(email)) {
    popup.classList.add('popup-show');
    popupMassage.innerText = 'Please enter valid email';
    return false;
  }
  fetch('/register', {
    method: 'POST',
    body: JSON.stringify(dataregisterEmail),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then((res) => {
      if (res.msg.msg === 'inserted sucssfully') {
        popup.classList.add('popup-show');
        popupMassage.innerText = 'We received your Email, we will send you our news.';
        innerTextRemove(Array.from(emailRegisterInput));
      } else if (res.msg.msg === 'there is some error in server please try again later') {
        popup.classList.add('popup-show');
        popupMassage.innerText = res.msg.msg;
      } else {
        popup.classList.add('popup-show');
        popupMassage.innerText = res.msg.msg;
      }
    })
    .catch(() => {
      popupMassage.innerText = 'There was an error with the server please check your internet connection and try again later';
    });
  return true;
});

poppUpDone.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.remove('popup-show');
});
