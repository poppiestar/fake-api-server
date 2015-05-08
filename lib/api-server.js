
/*

   load each api file

   add a new endpoint for each api file

*/

var express = require('express');
var glob = require('glob');
var Chance = require('chance');
var chance = new Chance();

var Constants = require('./api-constants');

var app = express();

function getApp () {
    return app;
}

function generateThing (thing) {
    switch (thing.type) {
        case Constants.BOOLEAN:
            return true;

        case Constants.STRING:
            return chance.first();

        default:
            return false;
    }
}

function generateResponse (file) {
    var response = {};

    for (var key in file) {
        response[key] = generateThing(file[key]);
    }

    return response;
}

function addApi (file) {
    app[file.type.toLowerCase()](file.path, function (req, res) {
        res.status(200).send(generateResponse(file.response));
    });

    console.log('API Added: %s', file.path);
}

module.exports = {
    api: getApp,
    addApi: addApi
};

