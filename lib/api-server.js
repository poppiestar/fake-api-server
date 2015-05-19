
/*

   load each endpoint file

   add a new endpoint for each file

*/

var express = require('express');
var responseUtils = require('./response-utils');

var app = express();

function getApp () {
    return app;
}

function addEndpoint (endpoints, endpoint) {
    app[endpoint.type.toLowerCase()](endpoint.path, function (req, res) {
        var response = endpoints[endpoint.path].actual;

        if (req.query) {
            for (var item in req.query) {
                if (response[item]) {
                    response[item] = responseUtils.decodeParameterValue(req.query[item]);
                }
            }
        }

        res.status(200).send(response);
    });

    console.log('Endpoint Added: %s', endpoint.path);
}

module.exports = {
    api: getApp,
    addEndpoint: addEndpoint
};

