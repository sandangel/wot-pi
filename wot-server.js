#!/usr/bin/nodejs

var debug = require('debug')('my-application');
var httpServer = require('./servers/http');
var resources = require('./resources/model');

httpServer.set('port', resources.pi.port);

var server = httpServer.listen(httpServer.get('port'), function () {
  console.info('Express server listening on port ' + server.address().port);
});
