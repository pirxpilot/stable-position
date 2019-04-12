[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][deps-dev-image]][deps-dev-url]

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

[npm-image]: https://img.shields.io/npm/v/stable-position.svg
[npm-url]: https://npmjs.org/package/stable-position

[travis-url]: https://travis-ci.org/pirxpilot/stable-position
[travis-image]: https://img.shields.io/travis/pirxpilot/stable-position.svg

[deps-image]: https://img.shields.io/david/pirxpilot/stable-position.svg
[deps-url]: https://david-dm.org/pirxpilot/stable-position

[deps-dev-image]: https://img.shields.io/david/dev/pirxpilot/stable-position.svg
[deps-dev-url]: https://david-dm.org/pirxpilot/stable-position?type=dev
