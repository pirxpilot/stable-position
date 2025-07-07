const test = require('node:test');
const fraction = require('../lib/fraction');

test('effective char range', async t => {
  await t.test('should be able to store char', t => {
    t.plan(2);

    t.assert.equal(String.fromCharCode(0).charCodeAt(0), 0);
    t.assert.equal(String.fromCharCode(0xffff).charCodeAt(0), 0xffff);
  });
});

test('fraction', async t => {
  await t.test('before', async t => {
    await t.test('should return value smaller than passed', t => {
      t.plan(1);
      t.assert.ok(fraction.before('a') < 'a');
    });
  });

  await t.test('after', async t => {
    await t.test('should return value smaller than passed', t => {
      t.plan(1);
      t.assert.ok(fraction.after('a') > 'a');
    });
  });

  await t.test('first', async t => {
    await t.test('should return value in the middle of available range', t => {
      t.plan(1);
      t.assert.equal(fraction.first().charCodeAt(0), 0x7fff);
    });
  });

  await t.test('between', async t => {
    await t.test('find a fraction between two values', t => {
      t.plan(7);

      t.assert.equal(fraction.between('0', 'z'), 'U');
      t.assert.equal(fraction.between('e', 'f'), 'e翿');
      t.assert.equal(fraction.between('0', '1'), '0翿');

      t.assert.equal(fraction.between('U', 'z'), 'g');
      t.assert.equal(fraction.between('yU', 'z'), 'y耪');

      t.assert.equal(fraction.between('abb', 'abbdefZ'), 'abb2');

      t.assert.equal(fraction.between('aBBcccc', 'aZ'), 'aN');
    });

    await t.test('find in between before', t => {
      const from = '0';
      let to = 'z';

      for (let i = 0; i < 1000; i++) {
        const b = fraction.between(from, to);
        t.assert.equal(fraction.compare(from, b), -1);
        t.assert.equal(fraction.compare(to, b), 1);
        to = b;
      }
    });

    await t.test('find in between after', t => {
      let from = '0';
      const to = 'z';

      for (let i = 0; i < 1000; i++) {
        const b = fraction.between(from, to);
        t.assert.equal(fraction.compare(from, b), -1);
        t.assert.equal(fraction.compare(to, b), 1);
        from = b;
      }
    });

    await t.test('find in between alternating before and after', t => {
      let from = '3';
      let to = 'w';
      let b;

      for (let i = 0; i < 5000; i++) {
        b = fraction.between(from, to);
        t.assert.equal(fraction.compare(from, b), -1);
        t.assert.equal(fraction.compare(to, b), 1);
        if (i % 2) {
          from = b;
        } else {
          to = b;
        }
      }

      t.assert.ok(b.length < 1000, 'b length should be below 1000');
    });
  });

  await t.test('betweenSeries', async t => {
    await t.test('should find optimal values between', t => {
      t.plan(4);
      t.assert.deepEqual(fraction.betweenSeries('a', 'd', 2), ['b', 'c']);
      t.assert.deepEqual(fraction.betweenSeries('a', 'e', 2), ['b', 'c']);
      t.assert.deepEqual(fraction.betweenSeries('a', 'f', 2), ['c', 'e']);
      t.assert.deepEqual(fraction.betweenSeries('a', 'f', 3), ['b', 'c', 'd']);
    });

    await t.test('should split result to fit additional values', t => {
      t.plan(1);
      t.assert.deepEqual(fraction.betweenSeries('a', 'b', 3), ['a\u5554', 'a\uaaa8', 'a\ufffc']);
    });

    await t.test('should return the sorted list of all positions', t => {
      t.plan(2);

      const positions = fraction.betweenSeries('a', 'd', 10000);
      t.assert.equal(positions.length, 10000, 'positions should have length 10000');
      t.assert.deepEqual(positions.sort(), positions);
    });
  });

  await t.test('compare', async t => {
    await t.test('should return 0 for equal', t => {
      t.plan(3);

      t.assert.equal(fraction.compare('abc', 'abc'), 0);
      t.assert.equal(fraction.compare('0Ac', '0Ac'), 0);

      t.assert.equal(
        fraction.compare(String.fromCharCode([0, 0xffff, 0xea10]), String.fromCharCode([0, 0xffff, 0xea10])),
        0
      );
    });

    await t.test('should detect -1 for <', t => {
      t.plan(4);

      t.assert.equal(fraction.compare('abc', 'abcd'), -1);
      t.assert.equal(fraction.compare('abc\uaaaa', 'abc\uaaab'), -1);
      t.assert.equal(fraction.compare('a', 'aa'), -1);
      t.assert.equal(fraction.compare('a0', 'aZ'), -1);
    });

    await t.test('should detect 1 for >', t => {
      t.plan(3);

      t.assert.equal(fraction.compare('abcd', 'abc'), 1);
      t.assert.equal(fraction.compare('aa', 'a'), 1);
      t.assert.equal(fraction.compare('aZ', 'a0'), 1);
    });
  });
});
