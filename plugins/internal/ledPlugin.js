var resources = require('./../../resources/model');

var actuator;
var model = resources.pi.actuators.leds['1'];
var pluginName = model.name;

exports.start = function () {

  var objectToObserve = new Proxy(model, objectChangeHandler)
  connectHardware();
  // var proxied = new Proxy(model, {
  //   get: function (target, prop) {
  //     console.log('Change detected by plugin for %s...', pluginName);
  //     switchOnOff(target[prop]);
  //     return Reflect.get(target, prop);
  //   }
  // });
};

exports.stop = function () {
  actuator.unexport();
  console.info('%s plugin stopped!', pluginName);
}

var objectChangeHandler = {
  apply: function (target, thisArg, argumentsList) {
    return thisArg[target].apply(this, argumentList);
  },
  deleteProperty: function (target, property) {
    console.log("Deleted %s", property);
    return true;
  },
  set: function (target, property, value, receiver) {
    target[property] = value;
    switchOnOff(value);
    console.log("Set %s to %o", property, value);
    return true;
  }
};
// function observe(what) {
//   Object.observe(what, function (changes) {
//     console.info('Change detected by plugin for %s...', pluginName);
//     switchOnOff(model.value); //#B
//   });
// };

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
