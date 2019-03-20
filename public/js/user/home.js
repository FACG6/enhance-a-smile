const {
  formContactUs,
  registerEmail,
  popup,
  popupMassage,
  poppUpDone,
  // eslint-disable-next-line no-undef
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
  if (!email || /^[\w.-_%+]+@[\w.-]+\.[a-zA-Z]{2,4}$/.test(email) === false || fullName || message) {
    popup.style.display = 'flex';
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
        popup.style.display = 'flex';
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
  if (/^[\w.-_%+]+@[\w.-]+\.[a-zA-Z]{2,4}$/.test(email) === false) {
    popup.style.display = 'flex';
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
        popup.style.display = 'flex';
        popupMassage.innerText = 'We received your Email, we will send you our news.';
      }
    });
  return true;
});

poppUpDone.addEventListener('click', (e) => {
  e.preventDefault();
  popup.style.display = 'none';
});
