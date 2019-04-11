const test = require('tape');
const { charAt, split, padRight, convert } = require('../lib/util');

test('charAt', function (t) {
  t.test('should work for all lenghts', function (t) {
    t.plan(5);

    t.equal(charAt('abc', 0, 'x'), 'a');
    t.equal(charAt('abc', 1, 'x'), 'b');
    t.equal(charAt('abc', 2, 'x'), 'c');
    t.equal(charAt('abc', 3, 'x'), 'x');
    t.equal(charAt('abc', 100, 'x'), 'x');
  });
});


test('split', function (t) {
  t.test('should work for even', function (t) {
    t.plan(2);
    t.same(split(4), [2, 2]);
    t.same(split(100), [50, 50]);
  });

  t.test('should work for odd', function (t) {
    t.plan(2);
    t.same(split(5), [2, 3]);
    t.same(split(101), [50, 51]);
  });
});

test('padRight', function (t) {
  t.test('should slice longer string', function (t) {
    t.plan(2);
    t.equal(padRight('abcdefgh', 3, 'z'), 'abc');
    t.equal(padRight('ab', 1, 'z'), 'a');
  });

  t.test('should pad shorter strings', function (t) {
    t.plan(2);
    t.equal(padRight('abc', 5, 'z'), 'abczz');
    t.equal(padRight('ab', 3, 'z'), 'abz');
  });

  t.test('should keep unchaged strings with adequate length', function (t) {
    t.plan(2);
    t.equal(padRight('abcd', 4, 'z'), 'abcd');
    t.equal(padRight('ab', 2, 'z'), 'ab');
  });
});

test('convert', function (t) {
  t.test('should create fractions for integer values', function (t) {
    t.plan(3);
    t.equal(convert(0), '\u7000');
    t.equal(convert(5), '\u7005');
    t.equal(convert(-10), '\u6FF6');
  });

  t.test('should create fractions for double values', function (t) {
    t.plan(4);

    t.equal(convert(0.46), '\u7000\u75c2\u8f5c\u28f5\uc400');
    t.equal(convert(5.244), '\u7005\u3e76\uc8b4\u3958');

    t.equal(convert(-10.98423234), '\u6FF6\u0409\u5970\u08D1\u7fff');
    t.equal(convert(-10.98423233), '\u6FF6\u0409\u599A\uFBEF\u7fff');
  });

  t.test('should maintain monotonicity', function (t) {
    t.plan(4);

    t.ok(convert(0.46) < convert(5.244));
    t.ok(convert(-5.244) < convert(0.46));
    t.ok(convert(-10.5) < convert(-10.4));
    t.ok(convert(-11.3) < convert(-10.4));
  });
});
