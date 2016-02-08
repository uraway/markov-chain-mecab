var Mecab = require('mecab-async');
var mecab = new Mecab();

class MarkovChainMecab {
  constructor(text, SENTENCE_COUNT) {
    this.parse(text, SENTENCE_COUNT);
  }

  parse(text, SENTENCE_COUNT) {
    mecab.parse(text, (err, items) => {
      let dic = this.makeDic(items);
      this.makeSentence(dic, SENTENCE_COUNT);
    });
  }

  makeDic(items) {
    let tmp = ['@'];
    let dic = {};
    for (let i in items) {
      let t = items[i];
      let word = t[0];
      word = word.replace(/\s*/, '');
      if (word == '' || word == 'EOS') continue;
      tmp.push(word);
      if (tmp.length < 3) continue;
      if (tmp.length > 3) tmp.splice(0, 1);
      this.setWord3(dic, tmp);
      if (word == '。') {
        tmp = ['@'];
        continue;
      }
    }

    return dic;
  }

  setWord3(p, s3) {
    var w1 = s3[0];
    var w2 = s3[1];
    var w3 = s3[2];
    if (p[w1] == undefined) p[w1] = {};
    if (p[w1][w2] == undefined) p[w1][w2] = {};
    if (p[w1][w2][w3] == undefined) p[w1][w2][w3] = 0;
    p[w1][w2][w3]++;
  }

  makeSentence(dic, SENTENCE_COUNT) {
    for (var i = 0; i < SENTENCE_COUNT; i++) {
      var ret = [];
      var top = dic['@'];
      if (!top) continue;
      var w1 = this.choiceWord(top);
      var w2 = this.choiceWord(top[w1]);
      ret.push(w1);
      ret.push(w2);
      for (;;) {
        var w3 = this.choiceWord(dic[w1][w2]);
        ret.push(w3);
        if (w3 == '。') break;
        w1 = w2, w2 = w3;
      }

      console.log(ret.join(''));
    }
  }

  objKeys(obj) {
    var r = [];
    for (var i in obj) {
      r.push(i);
    }

    return r;
  }

  choiceWord(obj) {
    var ks = this.objKeys(obj);
    var i = this.rnd(ks.length);
    return ks[i];
  }

  rnd(num) {
    return Math.floor(Math.random() * num);
  }
}

module.exports = MarkovChainMecab;
