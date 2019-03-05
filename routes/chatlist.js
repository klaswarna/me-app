var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const kmom = require("../models/kmom.js");

const mondo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/mumin";




//nedan route att visa chatboarden:

router.get('/chatlist', async function(request, response) { // undrar om skall vara next som sista parameter?
    try {
        let res = await kmom.findInCollection(dsn, "chat", {}, {}, 0);

        console.log(res);
        response.json(res);
    } catch(err) {
        console.log(err);
        response.json(err);
    }
});



module.exports = chatlist;
