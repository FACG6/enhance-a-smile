const {
  contacter,
  doneContact,
  contacterShow,
  contacterDoneShow,
  // eslint-disable-next-line no-undef
} = querySelectors(
  ['contacter', 'doneContact', 'contacterShow', 'contacterDoneShow'],
  ['.main-contactUs', '.main-contactUsDone', '.main--contact', '.main--contactDone'],
);

// eslint-disable-next-line no-undef
const { doneContactUs } = querySelectorsAll(['doneContactUs'], ['.done']);

doneContactUs.forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(element.value);
    fetch('/admin/contact-us', {
      method: 'POST',
      body: JSON.stringify(element.value),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        console.log(res.json());
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
