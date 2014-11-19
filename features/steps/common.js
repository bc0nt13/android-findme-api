var async = require('async');

(function () {
    'use strict';

    function myStepDefinitionsWrapper() {
        /*jshint validthis:true */

        this.World = require('../support/world.js').World;

        this.Given(/^I am an API client$/, function (callback) {
            callback();
        });

        this.Given(/^there are following rooms:$/, function (table, callback) {
            var Room = this.models.Room;

            async.eachSeries(table.hashes(), function (data, next) {
                var row = new Room(data);

                row.save(next);
            }, callback);
        });

        this.When(/^the client requests GET "([^"]*)"$/, function (url, callback) {
            this.request({
                method: 'GET',
                uri: url
            }, callback);
        });

        this.When(/^the client requests POST "([^"]*)" with data:$/, function (url, postdata, callback) {
            this.request({
                method: 'POST',
                uri: url,
                body: JSON.stringify(this.parseJSON(postdata)),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }, callback);
        });

        this.Then(/^print last response$/, function (callback) {
            console.log();
            console.log(this.response.statusCode);
            console.log(this.responseBody);
            console.log();
            callback();
        });

        this.Then(/^the response should be a "([^"]*)" with JSON:$/, function (statusCode, answer, callback) {
            if (this.response.statusCode !== parseInt(statusCode, 10)) {
                return callback.fail('Expected status code ' + statusCode);
            }

            var wildcards = {
                "ROOM_ID": "string",
                "CREATED_AT_TIMESTAMP": "number",
                "UPDATED_AT_TIMESTAMP": "number"
            };

            if (false === this.areEqualJSONs(this.responseBody, answer, wildcards)) {
                return callback.fail(
                    'Expected response body ' + answer + ", but got " + this.responseBody
                );
            }

            callback();
        });
    }

    module.exports = myStepDefinitionsWrapper;
})();
