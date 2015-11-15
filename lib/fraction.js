var util = require('./util');

module.exports = {
  first: first,
  before: before,
  after: after,
  between: between,
  compare: compare,
  betweenSeries: betweenSeries
};

var minChar = String.fromCharCode(0);
var maxChar = String.fromCharCode(0xFFFF);


function first() {
  return between('', '');
}

function before(b) {
  return between('', b);
}

function after(a) {
  return between(a, '');
}

function between(a, b, startIndex) {
  var chars = [], i, diff, achar, bchar, acode, bcode;

  for(i = startIndex || 0;; i++) {
    achar = util.charAt(a, i, minChar);
    bchar = util.charAt(b, i, maxChar);

    if (achar === bchar) {
      chars.push(achar);
      continue;
    }

    acode = achar.charCodeAt(0);
    bcode = bchar.charCodeAt(0);

    diff = bcode - acode;
    if (diff === 1) {
      chars.push(achar);
      continue;
    }

    chars.push(String.fromCharCode(acode + Math.floor(diff / 2)));
    break;
  }

  return chars.join('');
}


function betweenSeries(a, b, n, startIndex) {

  function splitAndMerge(startIndex) {
    var med, nums, arr1, arr2;

    med = between(a, b, startIndex);
    nums = util.split(n - 1);
    arr1 = betweenSeries(a, med, nums[0]);
    arr2 = betweenSeries(med, b, nums[1]);

    return arr1.concat(med, arr2);
  }

  function generate(prefix, num, step) {
    var i, result = [], code;

    code = prefix.charCodeAt(prefix.length - 1);
    prefix = prefix.slice(0, -1);

    for(i = 0; i < num; i++) {
      code += step;
      result.push(prefix + String.fromCharCode(code));
    }
    return result;
  }

  var i, achar, bchar, diff, acode, bcode;

  for(i = startIndex || 0;; i++) {
    achar = util.charAt(a, i, minChar);
    bchar = util.charAt(b, i, maxChar);


    if (achar === bchar) {
      continue;
    }

    acode = achar.charCodeAt(0);
    bcode = bchar.charCodeAt(0);

    diff = bcode - acode;
    if (diff > 1) {
      break;
    }
  }

  var step = Math.floor((diff - 1)/ n);

  if (step > 0) {
    return generate(util.padRight(a, i + 1, minChar), n, step);
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
