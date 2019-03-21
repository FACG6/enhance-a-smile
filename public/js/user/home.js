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
    popupMassage.innerText = 'Please enter validation values in inputes';
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
      if (res.msg === 'done') {
        popup.classList.add('popup-show');
        popupMassage.innerText = 'We received your Email, we will send you our news.';
      }
    });
  return true;
});

poppUpDone.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.remove('popup-show');
});
