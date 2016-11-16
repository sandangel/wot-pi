var resources = require('./../resources/model');
var WatchJS = require('watchjs');

var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var calWatchers = WatchJS.calWatchers;

var actuator;
var model1 = resources.pi.actuators.leds['1'];
var model2 = resources.pi.actuators.leds['2'];
// var pluginName = model.name;

exports.start = function() {

  watch(model1, 'value', function(prop, action, newvalue, oldvalue) {
    // console.info(prop + " - action: " + action + " - new: " + newvalue + ", old: " + oldvalue + "... and the context: " + JSON.stringify(this));
    switchOnOff(newvalue);
  });

  // watch(model2, 'value', function(prop, action, newvalue, oldvalue) {
  //   console.info(prop + " - action: " + action + " - new: " + newvalue + ", old: " + oldvalue + "... and the context: " + JSON.stringify(this));
  //   switchOnOff(newvalue);
  // });

  connectHardware(model1);
  // connectHardware(model2);
};

exports.stop = function() {
  actuator.unexport();
  console.info('%s plugin stopped!', model1.name);
};

function switchOnOff(value) {
  actuator.write(value === true ? 1 : 0, function() {
    console.info('Changed value of %s to %s', model1.name, value);
  });
};

function connectHardware(model) {
  var Gpio = require('onoff').Gpio;
  actuator = new Gpio(model.gpio, 'out');
  console.info(actuator);
  console.info('Hardware %s actuator started!', model1.name);
};
