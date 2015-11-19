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

describe('convert', function() {
  it('should create fractions for integer values', function() {
    util.convert(0).should.be.eql('\u7000');
    util.convert(5).should.be.eql('\u7005');
    util.convert(-10).should.be.eql('\u6FF6');
  });

  it('should create fractions for double values', function() {

    util.convert(0.46).should.be.eql('\u7000\u75c2\u8f5c\u28f5\uc400');
    util.convert(5.244).should.be.eql('\u7005\u3e76\uc8b4\u3958');

    util.convert(-10.98423234).should.be.eql('\u6FF6\u0409\u5970\u08D1\u7fff');
    util.convert(-10.98423233).should.be.eql('\u6FF6\u0409\u599A\uFBEF\u7fff');
  });

  it('should maintain monotonicity', function() {
    (util.convert(0.46) < util.convert(5.244)).should.be.ok();
    (util.convert(-5.244) < util.convert(0.46)).should.be.ok();
    (util.convert(-10.5) < util.convert(-10.4)).should.be.ok();
    (util.convert(-11.3) < util.convert(-10.4)).should.be.ok();
  });
});
