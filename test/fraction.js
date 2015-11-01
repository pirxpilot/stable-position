// var should = require('should');
var fraction = require('../lib/fraction');

describe('fraction', function () {


  describe('between', function() {

    it('find a fraction between two values', function () {
      fraction.between('0', 'z').should.be.eql('U');
      fraction.between('e', 'f').should.be.eql('eU');
      fraction.between('0', '1').should.be.eql('0U');

      fraction.between('U', 'z').should.be.eql('g');
      fraction.between('yU', 'z').should.be.eql('yg');


      fraction.between('abb', 'abbdefZ').should.be.eql('abbJ');

      fraction.between('aBBcccc', 'aZ').should.be.eql('aN');
    });

    it('find in between before', function () {
      var from = '0', to = 'z', b, i;

      for (i = 0; i < 1000; i++) {
        b = fraction.between(from, to);
        // console.log(from, '\t', b, '\t', to);
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

      // console.log(b.length);
      b.length.should.be.below(1000);
    });

  });


  describe('compare', function() {
    it('should return 0 for equal', function () {
      fraction.compare('abc', 'abc').should.eql(0);
      fraction.compare('0Ac', '0Ac').should.eql(0);
    });

    it('should detect -1 for <', function () {
      fraction.compare('abc', 'abcd').should.eql(-1);
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
