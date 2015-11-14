module.exports = {
  charAt: charAt,
  split: split,
  padRight: padRight
};

function charAt(string, i, def) {
  return i < string.length ? string[i] : def;
}

function split(n) {
  var odd = n % 2,
    half = Math.floor(n / 2);
  return [half, half + odd];
}

function padRight(str, len, pad) {
  var i;

  if (len < str.length) {
    return str.slice(0, len);
  }
  for(i = str.length; i < len; i++) {
    str += pad;
  }
  return str;
}
