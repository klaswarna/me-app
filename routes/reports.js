var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const kmom = require("../models/kmom.js");

const mondo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/chatboard";


// får se om detta middleware funkar här
router.post("/",
    (req, res, next) => checkToken(req, res, next),
    function(req, res){
    data = "";
    kmom.addReport(res, req.body);
    setTimeout (
        function() {
            data = kmom.checkAnswer();
            res.json(data);
        }, 500);
    });

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            // send error response
            res.json("Error. Invalid token");
            return

        } else {
            // Valid token send on the request
            next();
            return
        }
    });
}



router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "Välj ett specifikt kursmoment att läsa om. Skriv det sist i url:en"
        }
    };

    res.json(data);
});


router.get('/:kmom', function(req, res, next) {
    data = "";
    kmom.getReport(req.params.kmom);
    setTimeout (
        function() {
            const data = {
                data: {
                    msg: kmom.checkAnswer()
                }
            };
            res.json(data);
        }, 500);
});




module.exports = router;
