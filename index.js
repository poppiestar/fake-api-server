
var express = require('express');
var serveStatic = require('serve-static');
var fakeApi = require('./lib/api-server');

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(serveStatic(__dirname + '/node_modules/bootstrap/dist'));
app.use(fakeApi.api());

fakeApi.setup(__dirname, function () {
    app.listen(4040, function () {
        console.log('listening on port 4040');
    });
});

