const { charAt, padRight, split } = require('./util');

module.exports = {
  first,
  before,
  after,
  between,
  compare,
  betweenSeries
};

const minChar = String.fromCharCode(0);
const maxChar = String.fromCharCode(0xFFFF);

function first() {
  return between('', '');
}

function before(b) {
  return between('', b);
}

function after(a) {
  return between(a, '');
}

function between(a, b, startIndex = 0) {
  const chars = [];

  for(let i = startIndex;; i++) {
    const achar = charAt(a, i, minChar);
    const bchar = charAt(b, i, maxChar);

    if (achar === bchar) {
      chars.push(achar);
      continue;
    }

    const acode = achar.charCodeAt(0);
    const bcode = bchar.charCodeAt(0);

    const diff = bcode - acode;
    if (diff === 1) {
      chars.push(achar);
      continue;
    }

    chars.push(String.fromCharCode(acode + Math.floor(diff / 2)));
    break;
  }

  return chars.join('');
}


function betweenSeries(a, b, n, startIndex = 0) {
  function splitAndMerge(startIndex) {
    const med = between(a, b, startIndex);
    const nums = split(n - 1);
    const arr1 = betweenSeries(a, med, nums[0]);
    const arr2 = betweenSeries(med, b, nums[1]);

    return arr1.concat(med, arr2);
  }

  function generate(prefix, num, step) {
    const result = [];
    let code = prefix.charCodeAt(prefix.length - 1);
    prefix = prefix.slice(0, -1);

    for(let i = 0; i < num; i++) {
      code += step;
      result.push(prefix + String.fromCharCode(code));
    }
    return result;
  }

  let i = startIndex;
  let diff;

  for(;; i++) {
    const achar = charAt(a, i, minChar);
    const bchar = charAt(b, i, maxChar);

    if (achar === bchar) {
      continue;
    }

    const acode = achar.charCodeAt(0);
    const bcode = bchar.charCodeAt(0);

    diff = bcode - acode;
    if (diff > 1) {
      break;
    }
  }

  const step = Math.floor((diff - 1)/ n);

  if (step > 0) {
    return generate(padRight(a, i + 1, minChar), n, step);
  } else {
    return splitAndMerge(i);
  }
}

function compare(a, b) {
  if (a > b) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  return -1;
}
