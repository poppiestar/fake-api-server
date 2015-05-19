
var Types = require('../lib/api-types');

module.exports = {
    'name': 'Another API',
    'path': '/alt',
    'type': 'GET',
    'response': {
        valid: {
            type: Types.BOOLEAN,
            description: 'Whether this is a valid record or not'
        },
        name: {
            type: Types.STRING,
            description: 'The name of the user'
        },
        news: {
            type: Types.OBJECT,
            description: 'An object describing news',
            response: {
                example: {
                    type: Types.BOOLEAN,
                    description: 'Is this an example or not?'
                },
                another: {
                    type: Types.STRING,
                    description: 'Another string to display'
                }
            }
        }
    }
};

