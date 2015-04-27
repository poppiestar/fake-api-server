var express = require('express');
var glob = require('glob');
var fakeApi = require('./lib/api-server');

var app = express();

app.use('/fake', fakeApi);

glob('./api/**/*Api.js', function (err, files) {
    if (err) {
        return console.log(err);
    }

    for (var file in files) {
        console.log(files[file]);
    }
});

app.listen(4040, function () {
    console.log('listening on port 4040');
});

