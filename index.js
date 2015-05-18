var express = require('express');
var fs = require('fs');
var glob = require('glob');
var fakeApi = require('./lib/api-server');
var Constants = require('./lib/api-constants');
var responseUtils = require('./lib/response-utils');

var apiFiles = {};

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

        apiFiles[api.path] = api;
        fakeApi.addApi(api);
    }

    app.get('/config', function (req, res) {
        // generate responses
        for (var endpoint in apiFiles) {
            apiFiles[endpoint].actual = responseUtils.generateResponse(apiFiles[endpoint].response);
        }

        res.render('config', { constants: Constants, apiFiles: apiFiles });
    });

    // handle 404s
    app.use(function (req, res) {
        res.status(404).render('404');
    });

    app.listen(4040, function () {
        console.log('listening on port 4040');
    });
});

