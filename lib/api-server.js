
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

function decodeValue (value) {
    if (value === 'true' || value === 'false') {
        return (value === 'true' ? true : false);
    } else {
        return value;
    }
}

function addApi (file) {
    app[file.type.toLowerCase()](file.path, function (req, res) {
        var response = generateResponse(file.response);

        if (req.query) {
            for (var item in req.query) {
                response[item] = decodeValue(req.query[item]);
            }
        }

        res.status(200).send(response);
    });

    console.log('API Added: %s', file.path);
}

module.exports = {
    api: getApp,
    addApi: addApi
};

