'use strict'

const ava = require('ava')

const { promisify, callbackify } = require('.')

ava('promisified function catches Error on cb(new Error())', test => {

    const promisified = promisify(cb => {
        cb(new Error())
    })

    return promisified()
        .then(result => test.fail())
        .catch(err => {
            test.truthy(err && err instanceof Error)
        })
})

ava('promisified function catches Error on cb(true)', test => {

    const promisified = promisify(cb => {
        cb(true)
    })

    return promisified()
        .then(result => test.fail())
        .catch(err => {
            test.truthy(err && err instanceof Error)
        })
})

ava('promisified function accepts multiple arguments', test => {

    const promisified = promisify((a, b, cb) => {
        cb(null, a + b)
    })

    return promisified(1, 2)
        .then(result => test.is(result, 3))
        .catch(err => test.fail())
})

ava.cb('callbackified function throws Error on Promise.reject(false)', test => {

    const callbackified = callbackify(() => {
        return Promise.reject(false)
    })

    test.plan(1)
    callbackified(err => {
        test.fail()
        test.end()
    }).catch(err => {
        test.truthy(err && err instanceof Error)
        test.end()
    })
})

ava.cb('callbackified function has Error argument on Promise.reject(true)', test => {

    const callbackified = callbackify(() => {
        return Promise.reject(true)
    })

    test.plan(1)
    callbackified(err => {
        test.truthy(err && err instanceof Error)
        test.end()
    })
})

ava.cb('callbackified function has Error argument on Promise.reject(new Error())', test => {

    const callbackified = callbackify(() => {
        return Promise.reject(new Error())
    })

    test.plan(1)
    callbackified(err => {
        test.truthy(err && err instanceof Error)
        test.end()
    })
})

ava.cb('callbackified function accepts multiple arguments', test => {

    const callbackified = callbackify((a, b) => {
        return Promise.resolve(a + b)
    })

    test.plan(1)
    callbackified(1, 2, (err, result) => {
        if (err) test.fail()
        else test.is(result, 3)
        test.end()
    })
})
