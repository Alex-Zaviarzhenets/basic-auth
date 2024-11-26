const [regBtn, logInBtn] = document.getElementsByTagName('button');

regBtn.addEventListener('click', () => {
  location.href = '/registration.html';
});

logInBtn.addEventListener('click', () => {
  location.href = '/log-in.html';
});
