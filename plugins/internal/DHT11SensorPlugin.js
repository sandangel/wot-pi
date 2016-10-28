var resources = require('./../../resources/model');

var interval, sensor;
var model = resources.pi.sensors.pir;
var pluginName = resources.pi.sensors.pir.name;
var localParams = {
  'simulate': false,
  'frequency': 2000
};

exports.start = function (params) {
  localParams = params;
  if (localParams.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};

exports.stop = function () {
  if (localParams.simulate) {
    clearInterval(interval);
  } else {
    sensor.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

function connectHardware() {
  var sensorDriver = require('node-dht-sensor');
  var sensor = {
    initialize: function () {
      return sensorDriver.initialize(11, model.temperature.gpio);
    },
    read: function () {
      var readout = sensorDriver.read();
      model.temperature.value = parseFloat(readout.temperature.toFixed(2));
      model.humidity.value = parseFloat(readout.humidity.toFixed(2));
      showValue();

      setTimeout(function () {
        sensor.read();
      }, localParams.frequency);
    }
  };
  console.info('Hardware %s sensor started!', pluginName);
};

function simulate() {
  interval = setInterval(function () {
    model.value = !model.value;
    showValue();
  }, localParams.frequency);
  console.info('Simulated %s sensor started!', pluginName);
};

function showValue() {
  console.info(model.value ? 'there is someone!' : 'not anymore!');
};
