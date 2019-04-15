var fs = require("fs");

var data = fs.readFileSync('./src/env.ini');
var env = data.toString();
console.log(" *** the environment is: " + env);

module.exports = env;