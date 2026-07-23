import { charAt, padRight, split } from './util.js';

const minChar = String.fromCharCode(0);
const maxChar = String.fromCharCode(0xffff);

export function first() {
  return between('', '');
}

export function before(b) {
  return between('', b);
}

export function after(a) {
  return between(a, '');
}

export function between(a, b, startIndex = 0) {
  const chars = Array(Math.max(a.length, b.length) + 1);

  for (let i = startIndex, p = 0; ; i++, p++) {
    const achar = charAt(a, i, minChar);
    const bchar = charAt(b, i, maxChar);

    if (achar === bchar) {
      chars[p] = achar;
      continue;
    }

    const acode = achar.charCodeAt(0);
    const bcode = bchar.charCodeAt(0);

    const diff = bcode - acode;
    if (diff === 1) {
      chars[p] = achar;
      continue;
    }

    chars[p] = String.fromCharCode(acode + (diff >> 1));
    break;
  }

  return chars.join('');
}

export function betweenSeries(a, b, n) {
  let i = 0;
  let diff;

  for (; ; i++) {
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

  const step = Math.floor((diff - 1) / n);

  return step > 0 ? generate(padRight(a, i + 1, minChar), n, step) : splitAndMerge(a, b, n, i);
}

export function compare(a, b) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

function splitAndMerge(a, b, n, startIndex) {
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

  for (let i = 0; i < num; i++) {
    code += step;
    result.push(prefix + String.fromCharCode(code));
  }
  return result;
}
