const regForm = document.forms[0];

regForm.addEventListener('submit', handleSubmit)

regForm.cancel.addEventListener('click', goOut);

async function handleSubmit(e) {
  e.preventDefault();

  const { login, password, confirmPassword } = getFormData()

  try {
    if (password !== confirmPassword) {
      throw { problem: 'passwords do not match' }
    }

    const problems = validate({ login, password })

    if (problems) {
      throw { problem: problems.join(', ') }
    }

    const init = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({login, password})
    }

    const response = await fetch('/register', init)

    if (isOccupied(login)) {
      throw { problem: 'user already exists' }
    }

    registerUser(login, password)
    saveUsers()
    report('User registered successfully')
    setTimeout(goIn, 1000)
  } catch (error) {
    if (!error.problem) throw error

    complaint(error.problem)
  }
}

function getFormData() {
  return {
    login: regForm.login.value,
    password: regForm.password.value,
    confirmPassword: regForm.confirm.value
  }
}

function registerUser(login, password) {
  users.push({ login, password })
}

function isOccupied(login) {
  return users.some(user => user.login === login)
}

function report(message) {
  alert(message)
}

function goIn() {
  location.href = '/log-in.html';
}

function goOut() {
  location.href = '/lobby.html';
}

function complaint(message) {
  alert(message)
}

function validate({ login, password }) {
  const problems = [];

  if (login.length < 3) {
    problems.push('login must be at least 3 characters long')
  }

  if (login.includes(' ')) {
    problems.push('login must not contain spaces')
  }

  if (password.length < 6) {
    problems.push('password must be at least 6 characters long')
  }

  return problems.length ? problems : null
}
