var express = require('express');
var jf = require('jsonfile');
var glob = require('glob');
var fakeApi = require('./lib/api-server');
var Constants = require('./lib/api-constants');
var responseUtils = require('./lib/response-utils');

var endpoints = {};

var app = express();

var configPage = '/config';

app.set('views', './views');
app.set('view engine', 'jade');

app.use(fakeApi.api());

glob('./api/**/*Api.js', function (err, files) {
    if (err) {
        return console.log(err);
    }

    for (var file in files) {
        var filename = files[file];
        var endpoint = require(filename);

        endpoints[endpoint.path] = endpoint;
        endpoints[endpoint.path].actual = responseUtils.loadResponse(filename, endpoint);
        fakeApi.addEndpoint(endpoints, endpoint);
    }

    app.get(configPage, function (req, res) {
        var endpoint;

        if (req.query.endpoint) {
            endpoint = req.query.endpoint;
        }
        
        res.render('config', { constants: Constants, endpoints: endpoints, endpoint: endpoints[endpoint], configPage: configPage });
    });

    app.post(configPage, function (req, res) {
        res.status(200).send('Post received');
    });

    // handle 404s
    app.use(function (req, res) {
        res.status(404).render('404', { configPage: configPage });
    });

    app.listen(4040, function () {
        console.log('listening on port 4040');
    });
});

