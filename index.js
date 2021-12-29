let ws = require('ws');
let config = require('./config.json');
let pass = config.pass;

let server = new ws.Server({ port: 5051 })

server.on('connection', function(connection) {
  console.log('соединение состоялось');
  connection.on('message', function(message) {
    console.log('пришло сообщение:')
    message = JSON.parse(message)
    console.log(message);

    if(message.type == 'pass') {
      if(message.data == pass) {
        let query = { type: 'verify', data: { result: "success", gift: config.gift } }
        connection.send(JSON.stringify(query));
      } else {
        let query = { type: 'verify', data: { result: "fail" } }
        connection.send(JSON.stringify(query));
      }
    }
  });
})

server.on('close', function(err) {
  console.log('соединение разорвано');
})