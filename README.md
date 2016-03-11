## Install
```
npm install markov-chain-mecab
```

## Sample
```
var fs = require('fs');
var MarkovChain = require('markdov-chain-mecab');

var markov = new MarkovChain(fs.readFileSync('sample.txt', 'utf-8'));

console.log(markov.start(5));
```
