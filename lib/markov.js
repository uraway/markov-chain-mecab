'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MeCab = require('./mecab-mod');
var mecab = new MeCab();

var SENTENCE_COUNT = 3;

var MarkovChainMecab = function () {
  function MarkovChainMecab(text) {
    _classCallCheck(this, MarkovChainMecab);

    this.mecabParse = this.mecabParse.bind(this);
  }

  _createClass(MarkovChainMecab, [{
    key: 'mecabParse',
    value: function mecabParse(text) {
      var _this = this;

      mecab.parse(text, function (err, items) {
        var dic = _this.makeDic(items);
        _this.makeSentence(dic);
      });
    }
  }, {
    key: 'makeDic',
    value: function makeDic(items) {
      var tmp = ['@'];
      var dic = {};
      for (var i in items) {
        var t = items[i];
        var word = t[i];
        console.log(word);
        var words = word.split(/\s+/);
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
  }, {
    key: 'setWord3',
    value: function setWord3(p, s3) {
      var w1 = s3[0];
      var w2 = s3[1];
      var w3 = s3[2];
      if (p[w1] == undefined) p[w1] = {};
      if (p[w1][w2] == undefined) p[w1][w2] = {};
      if (p[w1][w2][w3] == undefined) p[w1][w2][w3] = 0;
      p[w1][w2][w3]++;
    }
  }, {
    key: 'makeSentence',
    value: function makeSentence(dic) {
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
  }, {
    key: 'objKeys',
    value: function objKeys(obj) {
      var r = [];
      for (var i in obj) {
        r.push(i);
      }

      return r;
    }
  }, {
    key: 'choiceWord',
    value: function choiceWord(obj) {
      var ks = this.objKeys(obj);
      var i = Math.floor(Math.random());
      return ks[i];
    }
  }]);

  return MarkovChainMecab;
}();

module.exports = MarkovChainMecab;