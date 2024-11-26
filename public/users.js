let users = [
  {login: 'bob', password: '123'},
  {login: 'alice', password: 'abc'},
]

let json = localStorage.getItem('users')

if (json) {
  users = JSON.parse(json);
} 

function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
} 
