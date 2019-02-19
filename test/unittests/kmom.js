/**
 * Test for class kmom.
 */
"use strict";

/* global describe it */

var assert = require("assert");
const kmom = require("../../models/kmom");

describe("Testing methods in kmom", function() {
    describe("Get current content of variable answer without prior use of parent method", function() {
        it("should return length 0 of empty array", function() {
            kmom.getReport("kmom02");
            let res = kmom.checkAnswer();
            let comp = []

            //assert.equal(res.length, comp.length);

            assert.equal(res.title, undefined);
        });
    });
    // describe("Testing getReport with invalid kmom-value (by checking answer)", function() {
    //     it("should return -no such index-", function() {
    //         kmom.getReport("kmom113");
    //         let res = kmom.checkAnswer();
    //
    //         assert.equal(res.paragraphs[0], "no such index");
    //     });
    // });
});
