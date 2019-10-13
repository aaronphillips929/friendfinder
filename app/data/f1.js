const fs = require("fs");
const path = require("path");
var raw = fs.readFileSync(path.join(__dirname, "f1.json"));
var f1drivers = JSON.parse(raw);
module.exports = f1;