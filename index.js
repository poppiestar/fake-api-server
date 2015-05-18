var express = require('express');
var glob = require('glob');
var fakeApi = require('./lib/api-server');
var Constants = require('./lib/api-constants');
var responseUtils = require('./lib/response-utils');

var endpoints = {};

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(fakeApi.api());

glob('./api/**/*Api.js', function (err, files) {
    if (err) {
        return console.log(err);
    }

    for (var file in files) {
        var api = require(files[file]);

        endpoints[api.path] = api;
        endpoints[api.path].actual = responseUtils.generateResponse(api.response);
        fakeApi.addApi(api);
    }

    app.get('/config', function (req, res) {
        var endpoint;

        if (req.query.endpoint) {
            endpoint = req.query.endpoint;
        }
        
        res.render('config', { constants: Constants, endpoints: endpoints, endpoint: endpoints[endpoint] });
    });

    app.post('/config', function (req, res) {
        res.status(200).send('Post received');
    });

    // handle 404s
    app.use(function (req, res) {
        res.status(404).render('404');
    });

    app.listen(4040, function () {
        console.log('listening on port 4040');
    });
});

