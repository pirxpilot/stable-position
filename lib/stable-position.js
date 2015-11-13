var fraction = require('./fraction');

function promote(pos) {
  if (typeof pos === 'number') {
    return {
      n: pos,
      s: ''
    };
  }
  return pos;
}

function before(pos) {
  pos = promote(pos);
  return {
    n: pos.n - 1,
    s: ''
  };
}

function after(pos) {
  pos = promote(pos);
  return {
    n: pos.n + 1,
    s: ''
  };
}

function between(a, b) {
  var s_from;
  a = promote(a);
  b = promote(b);

  s_from = a.n === b.n ? a.s : '';
  return {
    n: b.n,
    s: fraction.between(s_from, b.s)
  };
}

function compare(a, b) {
  var diff;

  a = promote(a);
  b = promote(b);
  diff = a - b;
  if (diff !== 0) {
    return diff;
  }
  return fraction.compare(a.s, b.s);
}

function first() {
  return {
    n: 1
  };
}

module.exports = {
  before: before,
  after: after,
  between: between,
  compare: compare,
  first: first
};
