
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

function generateResponseValue (response) {
    switch (response.type) {
        case Constants.BOOLEAN:
            return true;

        case Constants.STRING:
            return chance.first();

        case Constants.NUMBER:
            return chance.integer();

        default:
            return false;
    }
}

function generateResponse (file) {
    var response = {};

    for (var key in file) {
        response[key] = generateResponseValue(file[key]);
    }

    return response;
}

function decodeParameterValue (value) {
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
                if (response[item]) {
                    response[item] = decodeParameterValue(req.query[item]);
                }
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

