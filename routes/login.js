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

            if (hash === "No such user") {
                res.json({
                    token: false,
                    msg: "No such user"
                });
            } else {
                bcrypt.compare(password, hash, function(err, result) {
                    // res innehåller nu true eller false beroende på om det är rätt lösenord.
                    if (result) {
                        const token = jwt.sign(payload, secret, { expiresIn: '1h'});
                        res.json({
                            token: token,
                            msg: "You're logged in as " + payload.email,
                            user: payload.email
                        });
                    } else {
                        res.json({
                            token: false,
                            msg: "Invalid password, try again!"
                        });
                    }
                    console.log(result);
                });
            }

        }, 1000);
});


module.exports = router;
