var fs = require('fs');
var MarkovChain = require('../lib/index');

var markov = new MarkovChain(fs.readFileSync('sample.txt', 'utf-8'));

console.log(markov.start(5));
