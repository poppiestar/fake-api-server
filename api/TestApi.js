
var Constants = require('../lib/api-constants');

module.exports = {
    'name': 'Test API',
    'path': '/',
    'type': 'GET',
    'response': {
        valid: {
            type: Constants.BOOLEAN,
            description: 'Whether the thing is valid'
        },
        name: {
            type: Constants.STRING,
            description: 'The name of the thing'
        },
        count: {
            type: Constants.NUMBER,
            description: 'The number of things'
        }
    }
};

