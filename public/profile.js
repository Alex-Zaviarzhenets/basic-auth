const userOut = document.getElementById('user');
const logOutBtn = document.getElementsByTagName('button')[0];

handleOpen();

logOutBtn.addEventListener('click', goOut);

function handleOpen() {
  const url = new URL(location.href);
  const userName = url.searchParams.get('user');

  if (!userName || !doesExists(userName)) goOut();

  userOut.value = userName;
}

function doesExists(userName) {
  return users.some(user => user.login === userName);
}

function goOut() {
  location.href = '/lobby.html';
}
