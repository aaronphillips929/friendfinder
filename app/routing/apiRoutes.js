module.exports = function apiRoutes(app) {
    const fs = require("fs");
    const path = require("path");
    var f1drivers = require("../data/f1.js");

    app.get("/api/f1drivers", function (req, res) {
        return res.json(f1drivers);
    });

    app.post("/api/f1drivers", function (req, res) {
        var totDiff;
        var diffArry = [];
        var newDriver = req.body;

        for (var i = 0; i < f1drivers.length; i++) {
            totDiff = 0;
            for (var j = 0; j < newDriver.scores.length; j++) {
                totDiff += Math.abs(f1drivers[i].scores[j] - newDriver.scores[j]);
            } 
            diffArry.push(totDiff);
        } 

        var match = diffArry.indexOf(Math.min(...diffArry));

        f1drivers.push(newDriver);
        
        console.log(newDriver);

        fs.readFile(path.join(__dirname, "../data/f1.json"), "utf8", function (err, data) {
            if (err) throw err;
            var json = JSON.parse(data);
            json.push(newDriver);
            fs.writeFile(path.join(__dirname, "../data/f1.json"), JSON.stringify(json, null, 2), function (err) {
                if (err) throw err;
            });
        }); 
        res.json(f1drivers[match]);
    }); 
} 