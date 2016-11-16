var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ledsPlugin = require('./plugins/ledPlugin')

var bodyParser = require('body-parser');

var resources = require('./resources/model');
var model1 = resources.pi.actuators.leds['1'];
var model2 = resources.pi.actuators.leds['2'];

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
    if (msg.toString() == "true") {
      model1.value = true;
    } else if (msg.toString() == "false") {
      model1.value = false;
    }
  });

  socket.on('led1Switch', function(led) {
    io.emit('led1Switch', led);
    if (led.toString() == "TRUE") {
      model1.value = true;
      console.log('1 on');
    } else if (led.toString() == "FALSE") {
      model1.value = false;
      console.log('1 off');
    }
  });
  socket.on('led2Switch', function(led) {
    io.emit('led2Switch', led);
    if (led.toString() == "TRUE") {
      model2.value = true;
      console.log('2 on');
    } else if (led.toString() == "FALSE") {
      model2.value = false;
      console.log('2 off');
    }
  });
})

ledsPlugin.start();

http.listen(3000, function() {
  console.log('listening on *:3000');
});
