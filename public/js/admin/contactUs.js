const {
  contacter,
  doneContact,
  contacterShow,
  contacterDoneShow,
  profile,
  profileA,
  contactUs,
  contactUsA,
  popup,
  poppUpDone,
  message,
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
    'popup',
    'poppUpDone',
    'message',
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
    '.popup',
    '.popup--content-Done',
    '.popup--content-message',
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
        if (res.status === 500) {
          message.textContent = 'There some error , please try again .';
          popup.classList.add('popup-show');
        } else {
          message.textContent = 'finished add contact to done :)';
          popup.classList.add('popup-show');
        }
      })
      .catch(() => {
        message.textContent = 'There some error , please try again .';
        popup.classList.add('popup-show');
      });
  });
});

contacter.addEventListener('click', (e) => {
  e.preventDefault();
  doneContact.classList.remove('active');
  contacter.classList.add('active');
  contacterDoneShow.classList.add('hide');
  contacterShow.classList.remove('hide');
});

doneContact.addEventListener('click', (e) => {
  e.preventDefault();
  contacter.classList.remove('active');
  doneContact.classList.add('active');
  contacterShow.classList.add('hide');
  contacterDoneShow.classList.remove('hide');
});

poppUpDone.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.remove('popup-show');
});
