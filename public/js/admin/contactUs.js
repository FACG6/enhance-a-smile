const {
  contacter,
  doneContact,
  contacterShow,
  contacterDoneShow,
  profile,
  profileA,
  contactUs,
  contactUsA,
  // eslint-disable-next-line no-undef
} = querySelectors(
  [
    'contacter',
    'doneContact',
    'contacterShow',
    'contacterDoneShow',
    'profile',
    'profileA',
    'contactUs',
    'contactUsA',
  ],
  [
    '.main-contactUs',
    '.main-contactUsDone',
    '.main--contact',
    '.main--contactDone',
    '.profile',
    '.profile-a',
    '.contactUs',
    '.contactUs-a',
  ],
);

profile.classList.remove('focus');
profileA.classList.remove('black');
contactUs.classList.add('focus');
contactUsA.classList.add('black');

// eslint-disable-next-line no-undef
const { doneContactUs } = querySelectorsAll(['doneContactUs'], ['.done']);

doneContactUs.forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/admin/contact-us', {
      method: 'POST',
      body: JSON.stringify({ id: element.value }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        res.json();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

contacter.addEventListener('click', (e) => {
  e.preventDefault();
  contacterDoneShow.classList.add('hide');
  contacterShow.classList.remove('hide');
});

doneContact.addEventListener('click', (e) => {
  e.preventDefault();
  contacterShow.classList.add('hide');
  contacterDoneShow.classList.remove('hide');
});
