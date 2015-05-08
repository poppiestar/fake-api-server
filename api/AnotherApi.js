
var Constants = require('../lib/api-constants');

module.exports = {
    'name': 'Another API',
    'path': '/alt',
    'type': 'GET',
    'response': {
        valid: {
            type: Constants.BOOLEAN,
            description: 'Whether this is a valid record or not'
        },
        name: {
            type: Constants.STRING,
            description: 'The name of the user'
        }
    }
};

