/**
 * A module exporting functions to access the database.
 */
"use strict";


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

var answer;
var content ="";

function checkAnswer() {
    return answer;
}

//addar kmom
function addReport(res, content) {
    answer = "empty";
    db.run("INSERT INTO reports (id, content) VALUES (?, ?)",
        content.kmom,
        content.text, (err) => {
        if (err) {
            // returnera error
            answer = ("Something went wrong when adding report: " + err);
            return
        } else {
            // if went well
            answer = ["Report added", content.kmom, content.text];
            return
        }
    });
    return
}

function getReport(kmom) {
    console.log("kmomet som söks är: " + kmom); answer = "empty";
    db.all("SELECT content FROM reports WHERE id = ?",
        kmom,
        (err, row) => {
        if (err) {
            // returnera error
            answer = false;
        } else {
            if (row.length > 0) {
                content = row.map(stycke => stycke.content);
                //answer = row.map(stycke => stycke.content);
                answer = {
                     title: kmom,
                     paragraphs: content
                 };
            } else {
                answer = {
                    title: kmom,
                    paragraphs: ["no such index"]
                };
            }

            //console.log(row.length);
        }
    });
    return
}




module.exports = {
    addReport : addReport,
    checkAnswer : checkAnswer,
    getReport : getReport
};
