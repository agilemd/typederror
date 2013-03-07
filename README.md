# typederror
custom error type creator: throw new CustomError()

## installation

    $ npm install typederror

## usage

    var typedError = require('typederror')

    var MyError = typedError('MyError', {code: 0x1d107, message: 'Not a winning gamepiece.'})

    var e = new MyError()

    e.code
    // => 0x1d107

    e.message
    // => 'Not a winning gamepiece.'

    e.toString()
    // => 'MyError: Not a winning gamepiece.'

It'll give you a stack trace, just like a real `Error`!

    e.stack
    // => your normal stack trace-y stuff

It's `instanceof Error`

    e instanceof Error
    // => true

You can pass inner error messages!

    if (err) {
      throw new MyError('We gots an error!', err);
    }
    // err is available on the newly thrown error's `.inner` property

## api

### typedError(name, opts) => TypedError

`name` should be your the name of your error. By convention, it should be [PascalCase](http://c2.com/cgi/wiki?PascalCase) and end in `Error`.
`opts` is an optional object with any of these properties:

- `message`: default message for this error type
- `code`: value representing this type of error (for example, to map to an existing code set, like HTTP status codes)

Returns a TypedError constructor function.

### TypedError() or TypedError(message) or TypedError(inner) or TypedError(message, inner)

Constructor. May be called with or without `new` keyword.

`message` is a String. `inner` is an Error, an error to attach to the `inner` property. Use when throwing a new error in response to another error.

## contributors

jden <jason@denizac.org>

## license

MIT. (c) 2013 Agile Diagnosis <hello@agilediagnosis.com>. See LICENSE.md