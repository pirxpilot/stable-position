module.exports = {
  between: between,
  compare: compare
};

var minChar = '0';
var maxChar = 'z';

function charAt(string, i, def) {
  return i < string.length ? string[i] : def;
}

function between(a, b) {
  var chars = [], i, diff, achar, bchar, acode, bcode;

  for(i = 0;; i++) {
    achar = charAt(a, i, minChar);
    bchar = charAt(b, i, maxChar);

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


function compare(a, b) {
  if (a > b) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  return -1;
}
