var httpServer = require('./servers/http');
var resources = require('./resources/model');

var server = httpServer.listen(resources.pi.port, function () {
  console.info('Express server listening on port %s', resources.pi.port);
});
