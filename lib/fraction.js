var util = require('./util');

module.exports = {
  between: between,
  compare: compare,
  betweenSeries: betweenSeries
};

var minChar = String.fromCharCode(0);
var maxChar = String.fromCharCode(0xFFFF);


function between(a, b) {
  var chars = [], i, diff, achar, bchar, acode, bcode;

  for(i = 0;; i++) {
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


function betweenSeries(a, b, n) {
  function splitAndMerge() {
    var med, nums, arr1, arr2;

    med = between(a, b);
    nums = util.split(n - 1);
    arr1 = between(a, med, nums[0]);
    arr2 = between(med, b, nums[1]);

    return arr1.concat(med, arr2);
  }

  function generate(prefix, num, step) {
    var i, result = [];
    for(i = 1; i <= num; i++) {
      result.push(prefix + String.fromCharCode(i * step));
    }
    return result;
  }

  var i, achar, bchar, diff, acode, bcode;

  for(i = 0;; i++) {
    achar = util.charAt(a, i, minChar);
    bchar = util.charAt(b, i, maxChar);

    if (achar === bchar) {
      continue;
    }

    acode = achar.charCodeAt(0);
    bcode = bchar.charCodeAt(0);

    diff = bcode - acode;
    if (diff === 1) {
      continue;
    }
  }

  var step = Math.floor(diff / n);
  if (step > 0) {
    return generate(util.padRight(a, i + 1, minChar), n, step);
  } else {
    return splitAndMerge();
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
