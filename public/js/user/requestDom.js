const personalDetails = document.querySelector('.personal--details');
const next = document.querySelector('.next--button');
console.log(next);
console.log(personalDetails);

next.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(personalDetails);
  const personalInformation = {};
  formData.forEach((value, key) => {
    personalInformation[key] = value;
    console.log(key);
  });
  console.log(personalInformation);
});
