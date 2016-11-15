var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var ledsPlugin = require('./plugins/ledPlugin')

var bodyParser = require('body-parser');

var resources = require('./resources/model');
var model = resources.pi.actuators.leds['1'];

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
    if (msg.toString() == "true") {
      model.value = true;
    } else if (msg.toString() == "false") {
      model.value = false;
    }
  });
})

ledsPlugin.start();

http.listen(3000, function() {
  console.log('listening on *:3000');
});
