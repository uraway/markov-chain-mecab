## Install
```
npm install markov-chain-mecab
```

## Sample
```
var fs = require('fs');
var MarkovChain = require('markov-chain-mecab');

var markov = new MarkovChain(fs.readFileSync('sample.txt', 'utf-8'));

markov.start(5, function(output) {
  console.log(output);
});
```
