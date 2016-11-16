var resources = require('./../resources/model');
var WatchJS = require('watchjs');

var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var calWatchers = WatchJS.calWatchers;

var actuator;
var model = [];
// var model1 = resources.pi.actuators.leds['1'];
// var model2 = resources.pi.actuators.leds['2'];
// var pluginName = model.name;

exports.start = function() {
  model.push(resources.pi.actuators.leds['1']);
  watch(model[0], 'value', function(prop, action, newvalue, oldvalue) {
    switchOnOff(newvalue);
  });

  // watch(model2, 'value', function(prop, action, newvalue, oldvalue) {
  //   switchOnOff(newvalue);
  // });

  connectHardware(model[0]);
  // connectHardware(model2);
};

exports.stop = function() {
  actuator.unexport();
  console.info('%s plugin stopped!', model[0].name);
};

function switchOnOff(value) {
  actuator.write(value === true ? 1 : 0, function() {
    console.info('Changed value of %s to %s', model[0].name, value);
  });
};

function connectHardware(led) {
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(led.gpio, 'out');
  console.info(actuator);
  console.info('Hardware %s actuator started!', led.name);
};
