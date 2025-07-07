const test = require('node:test');
const { charAt, split, padRight, convert } = require('../lib/util');

test('charAt', async t => {
  await t.test('should work for all lenghts', t => {
    t.plan(5);

    t.assert.equal(charAt('abc', 0, 'x'), 'a');
    t.assert.equal(charAt('abc', 1, 'x'), 'b');
    t.assert.equal(charAt('abc', 2, 'x'), 'c');
    t.assert.equal(charAt('abc', 3, 'x'), 'x');
    t.assert.equal(charAt('abc', 100, 'x'), 'x');
  });
});

test('split', async t => {
  await t.test('should work for even', t => {
    t.plan(2);
    t.assert.deepEqual(split(4), [2, 2]);
    t.assert.deepEqual(split(100), [50, 50]);
  });

  await t.test('should work for odd', t => {
    t.plan(2);
    t.assert.deepEqual(split(5), [2, 3]);
    t.assert.deepEqual(split(101), [50, 51]);
  });
});

test('padRight', async t => {
  await t.test('should slice longer string', t => {
    t.plan(2);
    t.assert.equal(padRight('abcdefgh', 3, 'z'), 'abc');
    t.assert.equal(padRight('ab', 1, 'z'), 'a');
  });

  await t.test('should pad shorter strings', t => {
    t.plan(2);
    t.assert.equal(padRight('abc', 5, 'z'), 'abczz');
    t.assert.equal(padRight('ab', 3, 'z'), 'abz');
  });

  await t.test('should keep unchaged strings with adequate length', t => {
    t.plan(2);
    t.assert.equal(padRight('abcd', 4, 'z'), 'abcd');
    t.assert.equal(padRight('ab', 2, 'z'), 'ab');
  });
});

test('convert', async t => {
  await t.test('should create fractions for integer values', t => {
    t.plan(3);
    t.assert.equal(convert(0), '\u7000');
    t.assert.equal(convert(5), '\u7005');
    t.assert.equal(convert(-10), '\u6FF6');
  });

  await t.test('should create fractions for double values', t => {
    t.plan(4);

    t.assert.equal(convert(0.46), '\u7000\u75c2\u8f5c\u28f5\uc400');
    t.assert.equal(convert(5.244), '\u7005\u3e76\uc8b4\u3958');

    t.assert.equal(convert(-10.98423234), '\u6FF6\u0409\u5970\u08D1\u7fff');
    t.assert.equal(convert(-10.98423233), '\u6FF6\u0409\u599A\uFBEF\u7fff');
  });

  await t.test('should maintain monotonicity', t => {
    t.plan(4);

    t.assert.ok(convert(0.46) < convert(5.244));
    t.assert.ok(convert(-5.244) < convert(0.46));
    t.assert.ok(convert(-10.5) < convert(-10.4));
    t.assert.ok(convert(-11.3) < convert(-10.4));
  });

  await t.test('should only work on numbers', t => {
    t.assert.equal(convert('abc'), 'abc');
    t.assert.equal(convert(), undefined);
  });
});
