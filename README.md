## Install
```
npm install markov-chain-mecab
```

## Usage

```
const MarkovChainMecab = require('markov-chain-mecab');
const markov = new MarkovChainMecab(TEXT,SENTENCE_COUNT);
```

Options|Descritption
---|---
TEXT| Inout text you want to sumarize.
SENTENCE_COUNT| Output sentence count

## Sample
```
import fs from 'fs';
const MarkovChainMecab = require('./index.js');
const markov = new MarkovChainMecab(fs.readFileSync('sample.txt', 'utf8'), 5);

console.log(markov);
```
