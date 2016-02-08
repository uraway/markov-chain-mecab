'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MarkovChainMecab = require('./index.js');
var markov = new MarkovChainMecab(_fs2.default.readFileSync('sample.txt', 'utf8'), 5);

console.log(markov);