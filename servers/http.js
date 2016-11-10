var express = require('express');
var actuatorsRoutes = require('./../routes/actuators');
var sensorsRoutes = require('./../routes/sensors');
var thingsRoutes = require('./../routes/things');
var resources = require('./../resources/model');
var converter = require('./../middleware/converter');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

// app.set('view engine', 'ejs');
// app.set('views', __dirname.replace('servers', 'views'));

app.use(bodyParser.json());
app.use(express.static(__dirname.replace('servers', 'public')));
app.use(cors());

app.use('/pi/actuators', actuatorsRoutes);
app.use('/pi/sensors', sensorsRoutes);
app.use('/things', thingsRoutes);

app.get('/pi', function(req, res) {
  res.send('This is the WoT-Pi');
});

app.use(converter());

module.exports = app;
