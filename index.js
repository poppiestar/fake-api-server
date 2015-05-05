var express = require('express');
var fs = require('fs');
var glob = require('glob');
var fakeApi = require('./lib/api-server');

var apiFiles = {};

var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use('/', fakeApi.api());

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
        res.render('config', { apiFiles: apiFiles });
    });

    app.listen(4040, function () {
        console.log('listening on port 4040');
    });
});

