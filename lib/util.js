module.exports = {
  charAt,
  split,
  padRight,
  convert
};

const BASE = 0x7000;

function charAt(string, i, def) {
  return i < string.length ? string[i] : def;
}

function split(n) {
  const odd = n % 2;
  const half = Math.floor(n / 2);
  return [half, half + odd];
}

function padRight(str, len, pad) {
  if (len < str.length) {
    return str.slice(0, len);
  }
  for (let i = str.length; i < len; i++) {
    str += pad;
  }
  return str;
}

function convert(n) {
  if (typeof n !== 'number') {
    return n;
  }

  const s = n.toString(16).split('.');

  let i = s[0] || '';
  let f = s[1] || '';

  const fraction = [Number.parseInt(i, 16) + BASE];

  while (f.length) {
    i = f.slice(0, 4);
    if (i.length < 4) {
      i += '0000'.slice(0, -i.length);
    }
    i = Number.parseInt(i, 16);
    if (n < 0) {
      i = 0xffff - i;
    }
    fraction.push(i);
    f = f.slice(4);
  }

  return String.fromCharCode.apply(null, fraction);
}
