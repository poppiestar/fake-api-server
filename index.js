var express = require('express');

var app = express();

app.get('/user', function (req, res) {
    res.status(200).send({ name: 'someone' });
});

app.get('*', function (req, res) {
    res.status(404).send('wtf');
});

app.listen(4040, function () {
    console.log('listening on port 4040');
});

