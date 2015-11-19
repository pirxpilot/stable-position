module.exports = {
  charAt: charAt,
  split: split,
  padRight: padRight,
  convert: convert
};


var BASE = 0x7000;

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


function convert(n) {
  var i, f, fraction;

  if (typeof n !== 'number') {
    return n;
  }

  var s = n.toString(16).split('.');

  i = s[0] || '';
  f = s[1] || '';

  fraction = [ parseInt(i, 16) + BASE ];


  while(f.length) {
    i = f.slice(0, 4);
    if (i.length < 4) {
      i += '0000'.slice(0, -i.length);
    }
    i = parseInt(i, 16);
    if (n < 0) {
      i = 0xFFFF - i;
    }
    fraction.push(i);
    f = f.slice(4);
  }

  return String.fromCharCode.apply(null, fraction);
}
