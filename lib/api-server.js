

/*

   load each api file

   add a new endpoint for each api file

*/

var express = require('express');
var glob = require('glob');

var app = express();

function getApp () {
    return app;
}

function addApi (file) {
    app[file.type.toLowerCase()](file.path, function (req, res) {
        res.status(200).send(file.response);
    });

    console.log('API Added: %s', file.path);
}

module.exports = {
    api: getApp,
    addApi: addApi
};

