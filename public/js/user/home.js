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
});

registerEmail.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(registerEmail);
  const dataregisterEmail = {};
  formData.forEach((value, key) => {
    dataregisterEmail[key] = value;
  });
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
});

poppUpDone.addEventListener('click', (e) => {
  e.preventDefault();
  popup.style.display = 'none';
});
