var resources = require('./../resources/model');
var WatchJS = require('watchjs');

var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var calWatchers = WatchJS.calWatchers;

var actuator = [];
var model = [];

exports.start = function() {
  model.push(resources.pi.actuators.leds['1']);
  model.push(resources.pi.actuators.leds['2']);
  watch(model[0], 'value', function(prop, action, newvalue, oldvalue) {
    switchOnOff(0, newvalue);
  });

  watch(model[1], 'value', function(prop, action, newvalue, oldvalue) {
    switchOnOff(1, newvalue);
  });

  connectHardware(model[0]);
  connectHardware(model[1]);
};

exports.stop = function() {
  actuator.unexport();
  console.info('%s plugin stopped!', model[0].name);
};

function switchOnOff(numb, value) {
  actuator[numb].write(value === true ? 1 : 0, function() {
    console.info('Changed value of %s to %s', actuator[numb].gpio, value);
  });
};

function connectHardware(led) {
  var Gpio = require('onoff').Gpio;
  var numb = new Gpio(led.gpio, 'out');
  actuator.push(numb);
  console.info('Hardware %s actuator started!', led.name);
};
