var express = require('express');
var router = express.Router();
var ledsPlugin = require('../plugins/ledPlugin');

/* GET home page. */
router.get('/', function(req, res, next) {
  ledsPlugin.stop();
  ledsPlugin.start();
  res.render('index', {
    "led1": "off",
    "led2": "off"
  });
});

module.exports = router;
