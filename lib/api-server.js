

/*

   load each api file

   add a new endpoint for each api file

*/

var express = require('express');
var glob = require('glob');

var app = express();

app.get('/', function (req, res) {
    res.status(200).send('Fake API hello!');
});

module.exports = app;

