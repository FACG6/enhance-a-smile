const {
  send,
  email,
  emailSection,
  sendEmailSection,
  toEmails,
  form,
  msg,
  // eslint-disable-next-line no-undef
} = querySelectors(
  ['send', 'email', 'emailSection', 'sendEmailSection', 'toEmails', 'form', 'msg'],
  [
    '.main-send',
    '.main-emails',
    '.main--emails',
    '.main--sendEmail',
    '.toEmails',
    '.main--form',
    '.from-msg',
  ],
);

// eslint-disable-next-line no-undef
const { addEmail } = querySelectorsAll(['addEmail'], ['.addEmail']);

addEmail.forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    toEmails.value += `${element.value},`;
  });
});

send.addEventListener('click', (e) => {
  e.preventDefault();
  sendEmailSection.classList.remove('hide');
  emailSection.classList.add('hide');
});

email.addEventListener('click', (e) => {
  e.preventDefault();
  sendEmailSection.classList.add('hide');
  emailSection.classList.remove('hide');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const sendEmailData = {};
  formData.forEach((value, key) => {
    sendEmailData[key] = value;
  });
  fetch('/admin/registers', {
    method: 'POST',
    body: JSON.stringify(sendEmailData),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      if (res.status === 200) {
        msg.textContent = 'done';
      } else {
        msg.textContent = 'server error';
      }
    })
    .catch(() => {
      msg.textContent = 'server error try again later';
    });
});
