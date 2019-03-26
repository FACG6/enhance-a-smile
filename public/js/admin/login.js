// selecting elements from the html page
const {
  form, emailInput, passwordInput, loginBtn,
} = querySelectors(
  ['form', 'emailInput', 'passwordInput', 'loginBtn'],
  ['.form', '.email', '.password', '.login'],
);

// this function shows an error message to the user
const showErrorMsg = (form, button, msg) => {
  const errorMsg = document.createElement('span');
  errorMsg.appendChild(document.createTextNode(msg));
  errorMsg.classList = 'error';
  form.insertBefore(errorMsg, button);
};

// this function sends the data to the server and log's the admin in
const sendData = (email, password) => fetch('/login', {
  method: 'POST',
  credentials: 'same-origin',
  redirect: 'follow',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
});

// the event for logging in
const loginEvent = (e) => {
  // check for previous error messeges and remove them
  const error = document.querySelector('.error');
  if (error) form.removeChild(error);
  emailInput.classList.remove('input-error');
  passwordInput.classList.remove('input-error');

  // collect the form data
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email) {
    emailInput.classList.add('input-error');
    showErrorMsg(form, loginBtn, 'Please provide your email');
  } else if (!(email.includes('@') && email.includes('.'))) {
    emailInput.classList.add('input-error');
    showErrorMsg(form, loginBtn, 'Please provide a valid email');
  } else if (!/^[^><$'"*]*$/.test(email)) {
    emailInput.classList.add('input-error');
    showErrorMsg(form, loginBtn, 'Special characters are not allowed !!');
  } else if (!password) {
    passwordInput.classList.add('input-error');
    showErrorMsg(form, loginBtn, 'Please provide a password');
  } else if (!/^[^><$'"*]*$/.test(password)) {
    passwordInput.classList.add('input-error');
    showErrorMsg(form, loginBtn, 'Special characters are not allowed !!');
  } else {
    sendData(email, password);
  }
};

// add the event listener to the login buttton
loginBtn.addEventListener('click', loginEvent);
