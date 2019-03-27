const {
  send,
  email,
  emailSection,
  sendEmailSection,
  toEmails,
  form,
  msg,
  profile,
  profileA,
  registers,
  registersA,
  // eslint-disable-next-line no-undef
} = querySelectors(
  [
    'send',
    'email',
    'emailSection',
    'sendEmailSection',
    'toEmails',
    'form',
    'msg',
    'profile',
    'profileA',
    'registers',
    'registersA',
  ],
  [
    '.main-send',
    '.main-emails',
    '.main--emails',
    '.main--sendEmail',
    '.toEmails',
    '.main--form',
    '.from-msg',
    '.profile',
    '.profile-a',
    '.registers',
    '.registers-a',
  ],
);
profile.classList.remove('focus');
profileA.classList.remove('black');
registers.classList.add('focus');
registersA.classList.add('black');

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
  send.classList.add('active');
  email.classList.remove('active');
  sendEmailSection.classList.remove('hide');
  emailSection.classList.add('hide');
});

email.addEventListener('click', (e) => {
  e.preventDefault();
  send.classList.remove('active');
  email.classList.add('active');
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
