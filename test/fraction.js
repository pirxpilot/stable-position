// var should = require('should');
var fraction = require('../lib/fraction');


describe('effective char range', function() {
  it('should be able to store char', function() {
    String.fromCharCode(0).charCodeAt(0).should.eql(0);
    String.fromCharCode(0xFFFF).charCodeAt(0).should.eql(0xFFFF);
  });
});

describe('fraction', function () {

  describe('before', function() {
    it('should return value smaller than passed', function() {
      (fraction.before('a') < 'a').should.be.ok();
    });
  });

  describe('after', function() {
    it('should return value smaller than passed', function() {
      (fraction.after('a') > 'a').should.be.ok();
    });
  });

  describe('first', function() {
    it('should return value in the middle of available range', function() {
      fraction.first().charCodeAt(0).should.be.eql(0x7FFF);
    });
  });

  describe('between', function() {

    it('find a fraction between two values', function () {
      fraction.between('0', 'z').should.be.eql('U');
      fraction.between('e', 'f').should.be.eql('e翿');
      fraction.between('0', '1').should.be.eql('0翿');

      fraction.between('U', 'z').should.be.eql('g');
      fraction.between('yU', 'z').should.be.eql('y耪');


      fraction.between('abb', 'abbdefZ').should.be.eql('abb2');

      fraction.between('aBBcccc', 'aZ').should.be.eql('aN');
    });

    it('find in between before', function () {
      var from = '0', to = 'z', b, i;

      for (i = 0; i < 1000; i++) {
        b = fraction.between(from, to);
        fraction.compare(from, b).should.eql(-1);
        fraction.compare(to, b).should.eql(1);
        to = b;
      }
    });

    it('find in between after', function () {
      var from = '0', to = 'z', b, i;

      for (i = 0; i < 1000; i++) {
        b = fraction.between(from, to);
        fraction.compare(from, b).should.eql(-1);
        fraction.compare(to, b).should.eql(1);
        from = b;
      }
    });

    it('find in between alternating before and after', function () {
      var from = '3', to = 'w', b, i;

      for (i = 0; i < 5000; i++) {
        b = fraction.between(from, to);
        fraction.compare(from, b).should.eql(-1);
        fraction.compare(to, b).should.eql(1);
        if (i % 2) {
          from = b;
        } else {
          to = b;
        }
      }

      console.log(b.length);
      b.length.should.be.below(1000);
    });

  });

  describe('betweenSeries', function() {
    it('should find optimal values between', function() {
      fraction.betweenSeries('a', 'd', 2).should.eql(['b', 'c']);
      fraction.betweenSeries('a', 'e', 2).should.eql(['b', 'c']);
      fraction.betweenSeries('a', 'f', 2).should.eql(['c', 'e']);
      fraction.betweenSeries('a', 'f', 3).should.eql(['b', 'c', 'd']);
    });

    it('should split result to fit additional values', function() {
      fraction.betweenSeries('a', 'b', 3).should.eql(['a\u5554', 'a\uaaa8', 'a\ufffc']);
    });

    it('should return the sorted list of all positions', function() {
      var positions = fraction.betweenSeries('a', 'd', 10000);
      positions.should.have.length(10000);
      positions.sort().should.eql(positions);
    });

  });

  describe('compare', function() {
    it('should return 0 for equal', function () {
      fraction.compare('abc', 'abc').should.eql(0);
      fraction.compare('0Ac', '0Ac').should.eql(0);


      fraction.compare(String.fromCharCode([0, 0xFFFF, 0xEA10]), String.fromCharCode([0, 0xFFFF, 0xEA10]));
    });

    it('should detect -1 for <', function () {
      fraction.compare('abc', 'abcd').should.eql(-1);
      fraction.compare('abc\uaaaa', 'abc\uaaab').should.eql(-1);
      fraction.compare('a', 'aa').should.eql(-1);
      fraction.compare('a0', 'aZ').should.eql(-1);
    });

    it('should detect 1 for >', function () {
      fraction.compare('abcd', 'abc').should.eql(1);
      fraction.compare('aa', 'a').should.eql(1);
      fraction.compare('aZ', 'a0').should.eql(1);
    });
  });

});
