var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var ledsPlugin = require('./plugins/ledPlugin')

var bodyParser = require('body-parser');

var brightness = 0;

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
    if (msg.toString() == "true") {
      var obj;
      fs.readFile('./resources/resources.json', 'utf8', function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        obj.pi.actuators.leds[1].value = msg;
        fs.writeFile('./resources/resources-update.json', JSON.stringify(obj));
        var resources = require('./resources/model');
        var actuator;
        var model = resources.pi.actuators.leds['1'];
        var pluginName = model.name;

        function switchOnOff(value) {
          actuator.write(value === true ? 1 : 0, function() {
            console.info('Changed value of %s to %s', pluginName, value);
          });
        };

        function connectHardware() {
          var Gpio = require('onoff').Gpio;
          actuator = new Gpio(model.gpio, 'out');
          console.info('Hardware %s actuator started!', pluginName);
        };

        connectHardware();
        switchOnOff(resources.pi.actuators.leds[1].value);
        console.log(resources.pi.actuators.leds[1].value);
      });
    }
  });
})


// ledsPlugin.start();

http.listen(3000, function() {
  console.log('listening on *:3000');
});
