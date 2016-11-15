var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var ledsPlugin = require('./plugins/ledPlugin')

var resources = require('./resources/model');
var bodyParser = require('body-parser');

var brightness = 0;

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/leds/:id', function(req, res, next) {
  req.result = resources.pi.actuators.leds[req.params.id];
  if (req.result) {
    if (req.accepts('json')) {
      console.info('JSON representation selected!');
      res.send(req.result);
    }
  }
  next();
});

io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
    if (msg.toString() == "true") {
      var obj;
      console.log('reading');
      fs.readFile('./resources/resources.json', 'utf8', function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        obj.pi.actuators.leds[1].value = msg;
        fs.writeFile('./resources/resources.json', JSON.stringify(obj));
      });
    }
  });
});

ledsPlugin.start();

http.listen(3000, function() {
  console.log('listening on *:3000');
});
