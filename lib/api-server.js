
/*

   load each api file

   add a new endpoint for each api file

*/

var express = require('express');
var responseUtils = require('./response-utils');

var app = express();

function getApp () {
    return app;
}

function addApi (file) {
    app[file.type.toLowerCase()](file.path, function (req, res) {
        var response = responseUtils.generateResponse(file.response);

        if (req.query) {
            for (var item in req.query) {
                if (response[item]) {
                    response[item] = responseUtils.decodeParameterValue(req.query[item]);
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

