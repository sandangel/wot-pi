var httpServer = require('./servers/http'),
  wsServer = require('./servers/websockets');
// comment
var resources = require('./resources/model');
var ledsPlugin = require('./plugins/internal/ledPlugin'),
  pirPlugin = require('./plugins/internal/pirPlugin'),
  dhtPlugin = require('./plugins/internal/DHT11SensorPlugin');

pirPlugin.start({
  'simulate': false,
  'frequency': 2000
});
dhtPlugin.start({
  'simulate': false,
  'frequency': 10000
});
ledsPlugin.start();

var server = httpServer.listen(resources.pi.port, function () {
  console.info('HTTP server started...');
  wsServer.listen(server);
  console.info('Your WoT Pi is up and running on port %s', resources.pi.port);
});
