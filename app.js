var express = require('express');
var app = express();
var path = require('path');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(__dirname));

var routes = require('./flight-mode/routes.js');
app.post('/flight-mode', routes['flight-mode']);

routes = require('./flight-mode/demos/dbjs/routes.js');
app.get('/flight-mode/demos/dbjs/foo', routes.data);


app.listen(process.env.PORT || 3000);