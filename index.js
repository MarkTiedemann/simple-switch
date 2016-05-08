'use strict'

const promisify = foo => {
    return function () {
        return new Promise ((resolve, reject) => {
            foo(...arguments, (err, result) => {
                if (err instanceof Error) reject(err)
                else if (err) reject(new Error(err))
                else resolve(result)
            })
        })
    }
}

const callbackify = foo => {
    return function () {
        const args = [...arguments], cb = args.pop()
        return foo(...args)
            .then(result => cb(false, result))
            .catch(err => {
                if (err instanceof Error) cb(err)
                else if (err) cb(new Error(err))
                else throw new Error(err)
            })
    }
}

module.exports = { promisify, callbackify }
