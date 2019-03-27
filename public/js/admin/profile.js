const {
  adminPassword,
  adminPasswordHiden,
  showPassword,
  hidenPassword,
} = querySelectors(['adminPassword', 'adminPasswordHiden', 'showPassword', 'hidenPassword'], ['.admin--information-password', '.admin--information-password-show', '.fa-eye', '.fa-eye-slash']);
showPassword.addEventListener('click', (e) => {
  e.preventDefault();
  adminPassword.classList.add('hiden');
  adminPasswordHiden.classList.remove('hiden');
});
hidenPassword.addEventListener('click', (e) => {
  e.preventDefault();
  adminPasswordHiden.classList.add('hiden');
  adminPassword.classList.remove('hiden');
});
