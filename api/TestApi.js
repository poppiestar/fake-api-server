
var Constants = require('../lib/api-constants');

var Chance = require('chance');
var chance = new Chance();

function response () {
    return {
        valid: {
            type: Constants.BOOLEAN,
            description: 'Whether this is a valid record or not'
        },
        name: {
            type: Constants.STRING,
            description: 'The name of the user'
        }
    };
}

module.exports = {
    'path': '/',
    'type': 'GET',
    'response': response()
};

