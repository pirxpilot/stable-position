[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# stable-position

Generate unique position that can be used to order items without renumbering them.

## Description

The `stable-position` module generates unique, comparable position values by employing an algorithm analogous to decimal fraction notation. Each position is represented as a string of characters where each character corresponds to a level of granularity in a fraction. This representation allows direct comparison and ordering without the need to renumber items.

Because this approach relies on increasing the precision of the fractional part, it guarantees that a new position can always be found between any two existing valid positions, no matter how close they are.

## Install

```sh
$ npm install --save stable-position
```

## Usage

```js
import { first, after, between } from 'stable-position';
import * as assert from 'assert';

const a = first();
const z = after(a);
const x = between(a, z);

assert(a < x && x < z);
```

## API

### `first()`

returns a position value that can be used as a position of first element

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
