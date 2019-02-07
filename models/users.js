/**
 * A module exporting functions to access the database.
 */
"use strict";


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
//const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');//för det andra funkar ej på servern
const saltRounds = 10;
//const myPlaintextPassword = 'longandhardP4$$w0rD';

var answer = "";

function checkAnswer() {
    return answer
}

//hashar och lägger sen in ny användare
async function newUser(email, password) {
    answer = "empty";
    db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        email,
        password, (err) => {
        if (err) {
            // returnera error
            answer = ("Something went wrong: " + err);
        } else {
            // if went well
            answer = ("User added with email: " + email);
        }
    });
    return
}


function logIn(email, password) {
    answer = "tom";
    db.all("SELECT password FROM users WHERE email = ?",
        email,
        (err, row) => {
        if (err) {
            // returnera error
            answer = false;
        } else {
            if (row.length === 0) {
                answer = "nu such user";
            } else {
                answer = row[0].password;
            }
        }
    });
    return
}



module.exports = {
    newUser : newUser,
    logIn : logIn,
    checkAnswer : checkAnswer
};
