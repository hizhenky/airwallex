var fs = require('fs')
var program = require('commander');

program
  .version('1.0.0')
  .option('-p, --preview', 'http://preview.airwallex.com:30001')
  .option('-d, --demo', 'https://demo.airwallex.com:30001')
  .parse(process.argv);

if (program.preview){
    var app = 'http://preview.airwallex.com:30001';
    console.log('set environment: preview') 
}

if (program.demo) {
    var app = 'https://demo.airwallex.com:30001';
    console.log('set environment: demo') 
}

fs.writeFileSync('./src/env.ini',app);
var data = fs.readFileSync('./src/env.ini');
console.log(" *** the environment now is: " + data);
