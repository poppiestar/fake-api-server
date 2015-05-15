
var Chance = require('chance');
var chance = new Chance();
var Constants = require('./api-constants');

function generateResponseValue (response) {
    switch (response.type) {
        case Constants.BOOLEAN:
            return true;

        case Constants.STRING:
            return chance.first();

        case Constants.NUMBER:
            return chance.integer();

        case Constants.COLLECTION:
            var collection = [];

            if (response.count) {
                for (var i=0; i<response.count; i++) {
                    collection.push(generateResponse(response.response));
                }
            }

            return collection;

        default:
            return false;
    }
}

function generateResponse (description) {
    var response = {};

    for (var key in description) {
        response[key] = generateResponseValue(description[key]);
    }

    return response;
}

function decodeParameterValue (value) {
    if (value === 'true' || value === 'false') {
        return (value === 'true' ? true : false);
    } else {
        return value;
    }
}

module.exports = {
    generateResponse: generateResponse,
    decodeParameterValue: decodeParameterValue
};

