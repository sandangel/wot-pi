var resources = require('./../../resources/model');
var WatchJS = require('watchjs');

var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var calWatchers = WatchJS.calWatchers;

var actuator;
var model = resources.pi.actuators.leds['1'];
var pluginName = model.name;

exports.start = function () {

  watch(model, 'value', function (prop, action, newvalue, oldvalue) {
    alert(prop + " - action: " + action + " - new: " + newvalue + ", old: " + oldvalue + "... and the context: " + JSON.stringify(this));
    switchOnOff(model.value);
  });

  connectHardware();
};

exports.stop = function () {
  actuator.unexport();
  console.info('%s plugin stopped!', pluginName);
};

function switchOnOff(value) {
  actuator.write(value === true ? 1 : 0, function () {
    console.info('Changed value of %s to %s', pluginName, value);
  });
};

function connectHardware() {
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(model.gpio, 'out');
  console.info('Hardware %s actuator started!', pluginName);
};
