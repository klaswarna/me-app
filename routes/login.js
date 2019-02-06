var express = require('express');
var router = express.Router();

const users = require("../models/users.js");
//const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

router.post('/', function(req, res, next) {
    hash = "";
    email = req.body.email;
    password = req.body.password;
    const payload = { email: email };
    users.logIn(email);
    setTimeout(
        function() {
            hash = users.checkAnswer();

            if (hash === false) {
                res.json("Something went wrong");
            } else {
                bcrypt.compare(password, hash, function(err, result) {
                    // res innehåller nu true eller false beroende på om det är rätt lösenord.
                    if (result) {
                        const token = jwt.sign(payload, secret, { expiresIn: '1h'});
                        res.json(token);
                    } else {
                        res.json("Invalid password or username");
                    }
                    console.log(result);
                });
            }

        }, 1000);
});


module.exports = router;
