# type-get

[![NPM](https://img.shields.io/npm/v/type-get.svg)](https://npmjs.com/package/type-get)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)
[![Node.js CI](https://github.com/colinaaa/type-get/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/colinaaa/type-get/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/colinaaa/type-get/badge.svg?branch=main)](https://coveralls.io/github/colinaaa/type-get?branch=main)

## Why?

Similiar to [dlv](https://github.com/developit/dlv), but with types!

## Installation

```
yarn add type-get
```

## Usage

```ts
import {get} from 'type-get'

const obj = {
	a: {
		b: {
			c: 1,
			d: undefined,
			e: null
		}
	}
};

get(obj, "a.b.c") // resolve to number
get(obj, ["a", "b"]) // resolve to {c: number, d: undefined, e: null}
```

## TODO

- [ ] Support `get(obj, "a.b.1.c")`
- [ ] Support `get(obj, "a[b].c")`

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; Colin Wang</li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>
