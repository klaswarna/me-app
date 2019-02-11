/**
 * Test for class users.
 */
"use strict";

/* global describe it */

var assert = require("assert");
const users = require("../../models/users");

describe("Fetch content in variable Answer in users", function() {
    describe("Current content with prior try to falsly login", function() {
        it("should return empty string", function() {
            let res = users.checkAnswer();

            assert.equal(res, 'No such user');
        });
    });
});
