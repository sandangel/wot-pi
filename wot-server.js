var httpServer = require('./servers/http');
var resources = require('./resources/model');
var ledsPlugin = require('./plugins/internal/ledPlugin'),
  pirPlugin = require('./plugins/internal/pirPlugin'),
  dhtPlugin = require('./plugins/internal/DHT11SensorPlugin');

pirPlugin.start({
  'simulate': true,
  'frequency': 2000
});
dhtPlugin.start({
  'simulate': true,
  'frequency': 10000
});

var server = httpServer.listen(resources.pi.port, function () {
  console.info('Express server listening on port %s', resources.pi.port);
});
