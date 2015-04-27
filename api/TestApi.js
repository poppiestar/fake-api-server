
var Chance = require('chance');
var chance = new Chance();

function response () {
    return {
        name: chance.first(),
        dob: chance.birthday()
    };
}

module.exports = {
    'path': '/',
    'type': 'GET',
    'response': response()
};

