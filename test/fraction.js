const test = require('tape');
const fraction = require('../lib/fraction');

test('effective char range', t => {
  t.test('should be able to store char', t => {
    t.plan(2);

    t.equal(String.fromCharCode(0).charCodeAt(0), 0);
    t.equal(String.fromCharCode(0xffff).charCodeAt(0), 0xffff);
  });
});

test('fraction', t => {
  t.test('before', t => {
    t.test('should return value smaller than passed', t => {
      t.plan(1);
      t.ok(fraction.before('a') < 'a');
    });
  });

  t.test('after', t => {
    t.test('should return value smaller than passed', t => {
      t.plan(1);
      t.ok(fraction.after('a') > 'a');
    });
  });

  t.test('first', t => {
    t.test('should return value in the middle of available range', t => {
      t.plan(1);
      t.equal(fraction.first().charCodeAt(0), 0x7fff);
    });
  });

  t.test('between', t => {
    t.test('find a fraction between two values', t => {
      t.plan(7);

      t.equal(fraction.between('0', 'z'), 'U');
      t.equal(fraction.between('e', 'f'), 'e翿');
      t.equal(fraction.between('0', '1'), '0翿');

      t.equal(fraction.between('U', 'z'), 'g');
      t.equal(fraction.between('yU', 'z'), 'y耪');

      t.equal(fraction.between('abb', 'abbdefZ'), 'abb2');

      t.equal(fraction.between('aBBcccc', 'aZ'), 'aN');
    });

    t.test('find in between before', t => {
      const from = '0';
      let to = 'z';
      let b;

      for (let i = 0; i < 1000; i++) {
        b = fraction.between(from, to);
        t.equal(fraction.compare(from, b), -1);
        t.equal(fraction.compare(to, b), 1);
        to = b;
      }

      t.end();
    });

    t.test('find in between after', t => {
      let from = '0';
      const to = 'z';
      let b;

      for (let i = 0; i < 1000; i++) {
        b = fraction.between(from, to);
        t.equal(fraction.compare(from, b), -1);
        t.equal(fraction.compare(to, b), 1);
        from = b;
      }

      t.end();
    });

    t.test('find in between alternating before and after', t => {
      let from = '3';
      let to = 'w';
      let b;
      let i;

      for (i = 0; i < 5000; i++) {
        b = fraction.between(from, to);
        t.equal(fraction.compare(from, b), -1);
        t.equal(fraction.compare(to, b), 1);
        if (i % 2) {
          from = b;
        } else {
          to = b;
        }
      }

      t.ok(b.length < 1000, 'b length should be below 1000');

      t.end();
    });
  });

  t.test('betweenSeries', t => {
    t.test('should find optimal values between', t => {
      t.plan(4);
      t.same(fraction.betweenSeries('a', 'd', 2), ['b', 'c']);
      t.same(fraction.betweenSeries('a', 'e', 2), ['b', 'c']);
      t.same(fraction.betweenSeries('a', 'f', 2), ['c', 'e']);
      t.same(fraction.betweenSeries('a', 'f', 3), ['b', 'c', 'd']);
    });

    t.test('should split result to fit additional values', t => {
      t.plan(1);
      t.same(fraction.betweenSeries('a', 'b', 3), ['a\u5554', 'a\uaaa8', 'a\ufffc']);
    });

    t.test('should return the sorted list of all positions', t => {
      t.plan(2);

      const positions = fraction.betweenSeries('a', 'd', 10000);
      t.equal(positions.length, 10000, 'positions should have length 10000');
      t.same(positions.sort(), positions);
    });
  });

  t.test('compare', t => {
    t.test('should return 0 for equal', t => {
      t.plan(3);

      t.equal(fraction.compare('abc', 'abc'), 0);
      t.equal(fraction.compare('0Ac', '0Ac'), 0);

      t.equal(fraction.compare(String.fromCharCode([0, 0xffff, 0xea10]), String.fromCharCode([0, 0xffff, 0xea10])), 0);
    });

    t.test('should detect -1 for <', t => {
      t.plan(4);

      t.equal(fraction.compare('abc', 'abcd'), -1);
      t.equal(fraction.compare('abc\uaaaa', 'abc\uaaab'), -1);
      t.equal(fraction.compare('a', 'aa'), -1);
      t.equal(fraction.compare('a0', 'aZ'), -1);
    });

    t.test('should detect 1 for >', t => {
      t.plan(3);

      t.equal(fraction.compare('abcd', 'abc'), 1);
      t.equal(fraction.compare('aa', 'a'), 1);
      t.equal(fraction.compare('aZ', 'a0'), 1);
    });
  });
});
