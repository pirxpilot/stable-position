[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# stable-position

Generate unique position that can be used to order items without renumbering them.

## Install

```sh
$ npm install --save stable-position
```

## Usage

```js
const { first, after, between } = require('stable-position');

const a = first();
const z = after(a);

const x = between(a, z);

const assert = require('assert');

assert(a < x && x < z);

```

## API

### `first()`

returns a position value that is smaller than any other position

### `before(p)`

returns a position value that is smaller than the position represented by p

### `after(p)`

returns a position value that is bigger than the position represented by p

### `between(p ,q)`

return position value that is between p and q


## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/stable-position
[npm-url]: https://npmjs.org/package/stable-position

[build-url]: https://github.com/pirxpilot/stable-position/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/stable-position/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/stable-position
[deps-url]: https://libraries.io/npm/stable-position

