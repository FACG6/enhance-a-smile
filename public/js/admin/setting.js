const saveBtn = document.querySelector('.save');
const settingForm = document.querySelector('.form');
const showPassword = document.querySelector('.showPassword');
const newPassword = document.querySelector('.newPassword');
const confirmPassword = document.querySelector('.confirmPassword');
const oldPassword = document.querySelector('.oldPassword');
const valditMsg = document.querySelector('.valditMsg');
const profile = document.querySelector('.profile');
const profileA = document.querySelector('.profile-a');
const settings = document.querySelector('.settings');
const settingsA = document.querySelector('.settings-a');

profile.classList.remove('focus');
profileA.classList.remove('black');
settings.classList.add('focus');
settingsA.classList.add('black');

showPassword.addEventListener('click', (e) => {
  e.preventDefault();
  if (showPassword.value === 'Show Password') {
    const newPasswordValue = newPassword.value;
    const confirmPasswordValue = confirmPassword.value;
    const oldPasswordValue = oldPassword.value;
    newPassword.type = 'text';
    confirmPassword.type = 'text';
    oldPassword.type = 'text';
    newPassword.value = newPasswordValue;
    confirmPassword.value = confirmPasswordValue;
    oldPassword.value = oldPasswordValue;
    showPassword.value = 'Hide Password';
  } else {
    newPassword.type = 'password';
    confirmPassword.type = 'password';
    oldPassword.type = 'password';
    showPassword.value = 'Show Password';
  }
});

saveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(settingForm);
  const settingInformation = {};
  formData.forEach((value, key) => {
    settingInformation[key] = value;
  });
  const {
    full_name, email, newPassword, confirmPassword, oldPassword,
  } = settingInformation;
  if (!full_name) {
    valditMsg.textContent = 'Please enter your full name';
  } else if (full_name.length < 5) {
    valditMsg.textContent = 'Full name must be at least 6 characters';
  } else if (!email) {
    valditMsg.textContent = 'Please enter your email';
  } else if (!(email.includes('@') && email.includes('.'))) {
    valditMsg.textContent = 'Please enter a valid email';
  } else if (newPassword && newPassword.length < 3) {
    valditMsg.textContent = 'Password must be at least 3 characters';
  } else if (newPassword && newPassword !== confirmPassword) {
    valditMsg.textContent = 'Password do not match';
  } else if (!oldPassword) {
    valditMsg.textContent = 'Please enter your old password';
  } else if (oldPassword.length < 3) {
    valditMsg.textContent = 'Password must be at least 3 characters';
  } else {
    fetch('/admin/settings', {
      method: 'POST',
      body: JSON.stringify(settingInformation),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result) => {
        if (result.status === 200) {
          valditMsg.textContent = 'All Settings Saved';
          window.location = '/admin/settings';
        } else {
          valditMsg.textContent = ' Try againe, Password is Wrong';
        }
      })
      .catch(() => {
        valditMsg.textContent = 'catch Try againe';
      });
  }
});
