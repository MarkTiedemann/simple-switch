
# simple-switch

[![](https://travis-ci.org/MarkTiedemann/simple-switch.svg?branch=master)](https://travis-ci.org/MarkTiedemann/simple-switch)

**Easily switch between callbacks and Promises.**

- **Only 28 LOC.**
- **No dependencies.**
- **100% test coverage.**
- **Wraps Errors.**
- **Requires Node 6+.**

## Installation

```
npm i -S simple-switch
```

## Quickstart

**promisifiy:**

```javascript

const { promisify } = require('simple-switch')

const sum = (a, b, cb) => {
    cb(false, a + b)
}

const promisifiedSum = promisify(sum)

promisifiedSum(1, 2).then(sum => {
    console.log(sum) // => 3
})

```

**callbackify:**

```javascript

const { callbackify } = require('simple-switch')

const sum = (a, b) => {
    return Promise.resolve(a + b)
}

const callbackifiedSum = callbackify(sum)

callbackifiedSum(1, 2, sum => {
    console.log(sum) // => 3
})

```

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).
