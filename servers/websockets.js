var WebSocketServer = require('ws').Server,
  resources = require('./../resources/model');

var WatchJS = require('watchjs');

var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var calWatchers = WatchJS.calWatchers;

exports.listen = function (server) {
  var wss = new WebSocketServer({
    server: server
  });
  console.info('WebSocket server started...');
  wss.on('connection', function (ws) {
    var url = ws.upgradeReq.url;
    console.info(url);
    try {
      watch(selectResource(url), function () {
        ws.send(JSON.stringify(this), function () {});
      })
    } catch (e) {
      console.log('Unable to observer %s resource!', url);
    };
  });
};

function selectResource(url) {
  var parts = url.split('/');
  parts.shift();
  var result = resources
  for (var i = 0; i < parts.length; i++) {
    result = result[parts[i]];
  }
  return result;
}
