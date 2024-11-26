const loginForm = document.forms[0];




loginForm.addEventListener('submit', handleSubmit);

loginForm.cancel.addEventListener('click', goOut);

async function handleSubmit(e) {
  e.preventDefault();

  const { login, password } = getFormData()

  if (await check(login, password)) {
    goIn(login);
  } else {
    complaint('Incorrect login or password');
  }
}

function getFormData() {
  return {
    login: loginForm.login.value,
    password: loginForm.password.value
  }
}

function goOut() {
  location.href = '/lobby.html';
}

function goIn(userName) {
  location.href = '/profile.html?user=' + userName;
}



function check(login, password) {
  const init = {
    method: 'POST',
    headers: { 'Content-type': 'aplication/json' },
    body: JSON.stringify({ login, password })
  }

  return fetch('/login', init).then(response => response.ok)
}

function complaint(message) {
  alert(message)
}
