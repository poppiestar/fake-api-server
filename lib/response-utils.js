
var Chance = require('chance');
var chance = new Chance();
var Constants = require('./api-constants');
var jf = require('jsonfile');
var filenameChanger = require('filename-changer');

function loadResponse (filename, api) {
    var json;
    var newFilename = filenameChanger(filename, './json/{filename}.json');

    try {
        json = jf.readFileSync(newFilename);
    } 
    catch (e) {
        json = generateResponse(api.response);
        jf.writeFileSync(newFilename, json);
    }

    return json;
}

function generateResponseValue (response) {
    switch (response.type) {
        case Constants.BOOLEAN:
            return true;

        case Constants.STRING:
            return chance.first();

        case Constants.NUMBER:
            return chance.integer();

        case Constants.OBJECT:
            var object = {};

            if (response.response) {
                var keys = Object.keys(response.response);

                for (var key in keys) {
                    var attribute = keys[key];

                    object[attribute] = generateResponseValue(response.response[attribute]);
                }
            }

            return object;

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
    loadResponse: loadResponse,
    generateResponse: generateResponse,
    decodeParameterValue: decodeParameterValue
};

