var express = require('express');
var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(__dirname));

var flightModeRoutes = require('./flight-mode/routes.js');

app.post('/flight-mode', flightModeRoutes['flight-mode']);

app.listen(process.env.PORT || 3000);