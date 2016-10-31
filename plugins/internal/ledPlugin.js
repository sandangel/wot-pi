var resources = require('./../../resources/model');

var actuator;
var model = resources.pi.actuators.leds['1'];
var pluginName = model.name;

exports.start = function () {

  var objectToObserve = new Proxy(model, objectChangeHandler)

  // var proxied = new Proxy(model, {
  //   get: function (target, prop) {
  //     console.log('Change detected by plugin for %s...', pluginName);
  //     switchOnOff(target[prop]);
  //     return Reflect.get(target, prop);
  //   }
  // });

  connectHardware();
};

exports.stop = function () {
  actuator.unexport();
  console.info('%s plugin stopped!', pluginName);
}

var objectChangeHandler = {
  get: function (target, prop) {
    console.log('Change detected by plugin for %s...', pluginName);
    switchOnOff(target[prop]);
  }
};
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
