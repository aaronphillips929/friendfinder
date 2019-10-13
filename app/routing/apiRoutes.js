var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");

var f1drivers = require("../data/f1.js");

module.exports = function (app) {
    
    app.get("/api/f1drivers", function (req, res) {
        res.json(f1drivers);
    });
   
    app.post("/api/f1drivers", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            f1driversDifference: 1000
        };

        var userData = req.body;
        var userScores = userData.scores;

        var totalDifference = 0;

        for (var i = 0; i < f1drivers.length; i++) {

            console.log(f1drivers[i].name);
            totalDifference = 0;

            for (var j = 0; j < f1drivers[i].scores[j]; j++) {

                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(f1drivers[i].scores[j]));

                if (totalDifference <= bestMatch.f1driversDifference) {

                    bestMatch.name = f1drivers[i].name;
                    bestMatch.photo = f1drivers[i].photo;
                    bestMatch.f1driversDifference = totalDifference;
                }
            }
        }

    friends.push(userData);

    res.json(bestMatch);

    });
}