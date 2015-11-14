var util = require('../lib/util');

describe('charAt', function () {
  it('should work for all lenghts', function () {
    util.charAt('abc', 0, 'x').should.eql('a');
    util.charAt('abc', 1, 'x').should.eql('b');
    util.charAt('abc', 2, 'x').should.eql('c');
    util.charAt('abc', 3, 'x').should.eql('x');
    util.charAt('abc', 100, 'x').should.eql('x');
  });
});


describe('split', function () {
  it('should work for even', function () {
    util.split(4).should.eql([2, 2]);
    util.split(100).should.eql([50, 50]);
  });

  it('should work for odd', function () {
    util.split(5).should.eql([2, 3]);
    util.split(101).should.eql([50, 51]);
  });
});

describe('padRight', function() {
  it('should slice longer string', function () {
    util.padRight('abcdefgh', 3, 'z').should.eql('abc');
    util.padRight('ab', 1, 'z').should.eql('a');
  });

  it('should pad shorter strings', function() {
    util.padRight('abc', 5, 'z').should.eql('abczz');
    util.padRight('ab', 3, 'z').should.eql('abz');

  });

  it('should keep unchaged strings with adequate length', function() {
    util.padRight('abcd', 4, 'z').should.eql('abcd');
    util.padRight('ab', 2, 'z').should.eql('ab');
  });
});
