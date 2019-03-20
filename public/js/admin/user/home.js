const { formContactUs, registerEmail } = querySelectors(['formContactUs', 'registerEmail'], ['.footer--contactUs-form', '.footer--form']);


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
        // popup.style.display = 'flex';
      }
    });
});

// poppUpDone.addEventListener('click', (e) => {
//   e.preventDefault();
//  // popup.style.display = 'none';
// });
