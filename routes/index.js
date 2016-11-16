var express = require('express');
var router = express.Router();
var ledsPlugin = require('../plugins/ledPlugin');
var resources = require('../resources/model');
var model = [];
model.push(resources.pi.actuators.leds['1']);
model.push(resources.pi.actuators.leds['2']);
/* GET home page. */
router.get('/', function(req, res, next) {
  // ledsPlugin.stop();
  // ledsPlugin.start();
  res.render('index', {
    "led1": model[0].value,
    "led2": model[1].value
  });
});

module.exports = router;
