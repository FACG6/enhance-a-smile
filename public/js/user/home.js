<<<<<<< HEAD
const { formContactUs, registerEmail } = querySelectors(['formContactUs', 'registerEmail'], ['.footer--contactUs-form', '.footer--form']);

=======
const formContactUs = document.querySelector('.footer--contactUs-form');
const registerEmail = document.querySelector('.footer--form');
const popup = document.querySelector('.popup');
const poppUpDone = document.querySelector('.popup--content-Done');
>>>>>>> 79886b2fc59526b1a48c17495654b7551f2f3232

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
<<<<<<< HEAD
  });
=======
  })
    .then(res => res.json())
    .then((res) => {
      if (res.msg === 'done') {
        popup.style.display = 'flex';
      }
    });
>>>>>>> 79886b2fc59526b1a48c17495654b7551f2f3232
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
<<<<<<< HEAD
  });
=======
  })
    .then(res => res.json())
    .then((res) => {
      if (res.msg === 'done') {
        popup.style.display = 'flex';
      }
    });
});

poppUpDone.addEventListener('click', (e) => {
  e.preventDefault();
  popup.style.display = 'none';
>>>>>>> 79886b2fc59526b1a48c17495654b7551f2f3232
});
