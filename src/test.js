import fs from 'fs';
const MarkovChainMecab = require('./index.js');
const markov = new MarkovChainMecab(fs.readFileSync('sample.txt', 'utf8'), 3);

console.log(markov);
