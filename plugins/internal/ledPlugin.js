var resources = require('./../../resources/model');

var actuator;
var model = resources.pi.actuators.leds['1'];
var pluginName = model.name;
// var localParams = {
//   'simulate': false,
//   'frequency': 2000
// };

exports.start = function () {
  var observer = new ObjectObserver(model);
  observer.open(function (changed) {
    Object.key(changed).forEach(function (property) {
      console.info('Change detected by plugin for %s...', pluginName);
      switchOnOff(changed[property]);
    });
  });
  connectHardware();
};

exports.stop = function () {
  actuator.unexport();
  console.info('%s plugin stopped!', pluginName);
}

// function observe(what) {
//   Object.observe(what, function (changes) {
//     console.info('Change detected by plugin for %s...', pluginName);
//     switchOnOff(model.value); //#B
//   });
// };

function switchOnoOff(value) {
  actuator.write(value === true ? 1 : 0, function () {
    console.info('Changed value of %s to %s', pluginName, value);
  });
};

function connectHardware() {
  var Gpio = require('on/off').Gpio;
  actuator = new Gpio(model.gpio, 'out');
  console.info('Hardware %s actuator started!', pluginName);
};
