var express = require('express'),
  router = express.Router(),
  resources = require('./../resources/model');

router.route('/').get(function (req, res, next) {
  res.send(resources.pi.actuators);
});

module.exports = router;
