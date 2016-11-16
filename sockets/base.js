var resources = require('../resources/model');
var model1 = resources.pi.actuators.leds['1'];
var model2 = resources.pi.actuators.leds['2'];

module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('user connected');
    socket.on('chat message', function(msg) {
      io.emit('chat message', msg);
      if (msg.toString() == "true") {
        model1.value = true;
      } else if (msg.toString() == "false") {
        model1.value = false;
      }
    });

    socket.on('led1Switch', function(led) {
      io.emit('led1Switch', led);
      if (led.toString() == "TRUE") {
        model1.value = true;
        console.log('1 on');
      } else if (led.toString() == "FALSE") {
        model1.value = false;
        console.log('1 off');
      }
    });
    socket.on('led2Switch', function(led) {
      io.emit('led2Switch', led);
      if (led.toString() == "TRUE") {
        model2.value = true;
        console.log('2 on');
      } else if (led.toString() == "FALSE") {
        model2.value = false;
        console.log('2 off');
      }
    });
  });
}
