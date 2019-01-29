var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const users = require("../models/users.js");
const saltRounds = 10;

router.post('/', function(req, res, next) {
    var data = "sune";
    email = req.body.email;
    password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
    // spara lösenord i databasen.
    users.newUser(email, hash);
    });
    setTimeout(
        function() {
            data = users.checkAnswer();
            res.json(data);
        }, 500);
    });

module.exports = router;
