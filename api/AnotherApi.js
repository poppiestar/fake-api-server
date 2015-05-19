
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
        },
        news: {
            type: Constants.OBJECT,
            description: 'An object describing news',
            response: {
                example: {
                    type: Constants.BOOLEAN,
                    description: 'Is this an example or not?'
                },
                another: {
                    type: Constants.STRING,
                    description: 'Another string to display'
                }
            }
        }
    }
};

