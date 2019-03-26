const {
  profile, donates, requests, helpOthers, registers, contactUs, settings,
} = querySelectors(
  ['profile', 'donates', 'requests', 'helpOthers', 'registers', 'contactUs', 'settings'],
  ['.profile', '.donates', '.requests', '.help-others', '.registers', '.contact-us', '.settings'],
);

profile.addEventListener('click', () => {
  window.location.href = '/admin/profile';
});
donates.addEventListener('click', () => {
  window.location.href = '/admin/donates';
});
requests.addEventListener('click', () => {
  window.location.href = '/admin/requests';
});
helpOthers.addEventListener('click', () => {
  window.location.href = '/admin/help-others';
});
registers.addEventListener('click', () => {
  window.location.href = '/admin/registers';
});
contactUs.addEventListener('click', () => {
  window.location.href = '/admin/contact-us';
});
settings.addEventListener('click', () => {
  window.location.href = '/admin/settings';
});
