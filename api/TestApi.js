
var Types = require('../lib/api-types');

module.exports = {
    'name': 'Test API',
    'path': '/',
    'type': 'GET',
    'response': {
        valid: {
            type: Types.BOOLEAN,
            description: 'Whether the thing is valid'
        },
        name: {
            type: Types.STRING,
            description: 'The name of the thing'
        },
        count: {
            type: Types.NUMBER,
            description: 'The number of things'
        },
        things: {
            type: Types.COLLECTION,
            description: 'A group of things',
            count: 3,
            response: {
                firstname: {
                    type: Types.STRING,
                    description: 'Firstname'
                }
            }
        }
    }
};

