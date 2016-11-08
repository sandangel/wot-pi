var express = require('express'),
  router = express.Router(),
  resources = require('./../resources/model');

router.route('/').get(function (req, res, next) {
  req.result = resources.pi.actuators;
  next();
});

router.route('/leds/:id').get(function (req, res, next) {
  req.result = resources.pi.actuators.leds[req.params.id];
  res.render('led', {
    title: 'IOT Project',
    message: 'Turn LED on/off'
  });
  next();
});

router.route('/leds/:id').put(function (req, res, next) {
  var selectedLed = resources.pi.actuators.leds[req.params.id];
  selectedLed.value = req.body.value;
  // console.info('Changed LED %s value to %s', req.params.id, selectedLed.value);
  req.result = selectedLed;
  next();
});

module.exports = router;
