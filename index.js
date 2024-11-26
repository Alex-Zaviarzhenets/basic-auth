let users = [
  { login: 'bob', password: '123' },
  { login: 'alice', password: 'abc' },
]


const http = require('http');
const fs = require('fs');
const port = 3000;
const server = http.createServer(handleRequest);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function handleRequest(request, response) {
  if (request.method === 'POST') {
    handlePOST(request, response)
    return
  }
  if (request.url === '/') request.url = '/lobby.html';

  const path = 'public' + request.url;

  try {
    const fileContent = fs.readFileSync(path);

    response.end(fileContent)
  } catch (error) {
    response.statusCode = 404;
    response.end('File not found: ' + request.url);
  }
}

function handlePOST(request, response) {
  let body = ''

  request.addListener('data', (buffer) => body += buffer.toString())
  request.addListener('end', () => {
    const data = JSON.parse(body);
    console.log(data)

    if (request.url === "/register") {
      users.push(data)
      console.log(users)
    } else if (request.url === "/login") {
      const {login, password} = data
      if (check(login, password)) {
        response.end('ok')
      } else {
        response.statusCode = 401;
        response.end('unauthorized')
      }
      


    }
  })

}

function check(login, password) {
  return users.some(user => user.login === login && user.password === password);
}
