
/*

   load each endpoint file

   add a new endpoint for each file

*/

var express = require('express');
var responseUtils = require('./response-utils');
var jf = require('jsonfile');
var glob = require('glob');
var Types = require('./api-types');
var fs = require('fs');

var configPage = '/config';
var endpoints = {};

var app = express();

function setup (directory, callback) {

    // create json cache directory if it doesn't already
    try {
        fs.mkdirSync('./json');
    } catch(e) {
        if ( e.code !== 'EEXIST' ) throw e;
    }

    glob(directory + '/api/**/*Api.js', function (err, files) {
        if (err) {
            return console.log(err);
        }

        for (var file in files) {
            var filename = files[file];
            var endpoint = require(filename);

            endpoints[endpoint.path] = endpoint;
            endpoints[endpoint.path].actual = responseUtils.loadResponse(filename, endpoint);
            addEndpoint(endpoints, endpoint);
        }

        app.get(configPage, function (req, res) {
            var endpoint;

            if (req.query.endpoint) {
                endpoint = req.query.endpoint;
            }
            
            res.render('config', { types: Types, endpoints: endpoints, endpoint: endpoints[endpoint], configPage: configPage });
        });

        app.post(configPage, function (req, res) {
            res.status(200).send('Post received');
        });

        // handle 404s
        app.use(function (req, res) {
            res.status(404).render('404', { configPage: configPage });
        });

        callback();
    });
}

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
    setup: setup
};

