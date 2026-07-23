const BASE = 0x7000;

export function charAt(string, i, def) {
  return i < string.length ? string[i] : def;
}

export function split(n) {
  const odd = n % 2;
  const half = Math.floor(n / 2);
  return [half, half + odd];
}

export function padRight(str, len, pad) {
  return len < str.length ? str.slice(0, len) : str.padEnd(len, pad);
}

export function convert(n) {
  if (typeof n !== 'number') {
    return n;
  }

  let [i, f = ''] = n.toString(16).split('.');

  const fraction = [];
  while (f.length) {
    let p = f.slice(0, 4);
    if (p.length < 4) {
      p += '0000'.slice(0, -p.length);
    }
    p = Number.parseInt(p, 16);
    if (n < 0) {
      p = 0xffff - p;
    }
    fraction.push(p);
    f = f.slice(4);
  }

  return String.fromCharCode(Number.parseInt(i, 16) + BASE, ...fraction);
}
