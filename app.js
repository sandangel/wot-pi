var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var ledsPlugin = require('./plugins/ledPlugin')

var bodyParser = require('body-parser');

var brightness = 0;
var obj;
fs.readFile('./resources/resources.json', 'utf8', function(err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});
// fs.writeFileSync('./resources/resources-update.json', JSON.stringify(obj));
var resources = require('./resources/resources.json');
var actuator;
var model = resources.pi.actuators.leds['1'];
var pluginName = model.name;
var WatchJS = require('watchjs');

var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var calWatchers = WatchJS.calWatchers;

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

function start() {
  watch(model, 'value', function(prop, action, newvalue, oldvalue) {
    console.info(prop + " - action: " + action + " - new: " + newvalue + ", old: " + oldvalue + "... and the context: " + JSON.stringify(this));
    switchOnOff(newvalue);
  });

  connectHardware();
};


app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
    if (msg.toString() == "true") {
      model.pi.actuators.leds['1'].value = "true";
    }
  });
})


// ledsPlugin.start();
start();

http.listen(3000, function() {
  console.log('listening on *:3000');
});
