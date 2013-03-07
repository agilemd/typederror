var chai = require('chai')
chai.should()

var typedError = require('../index')

describe('typedError', function () {
  it('returns a TypedError', function () {
    typedError().should.be.a('function')
  })

  describe('params', function () {
    it('name', function () {
      var E = typedError('E')
      var e = new E()

      e.name.should.equal('E')
    })

    it('code', function () {
      var E = typedError('E', {code: 23})
      var e = new E()
      e.code.should.equal(23)
    })

    it('message', function () {
      var E = typedError('E', {message: 'foo'})
      var e = new E()
      e.message.should.equal('foo')
    })
  })

})

describe('TypedError', function () {

  it('is instanceof Error', function () {
    var MyError = typedError('MyError')
    var err = new MyError()
    err.should.be.instanceof(Error)
  })

  it('has stack traces', function () {
    var MyError = typedError('MyError')
    var err = new MyError()
    err.stack.should.be.a('string')
  })

  it('has custom messages', function () {
    var E = typedError('E')
    var e = new E('messuj')
    e.message.should.equal('messuj')
  })

  it('has inner errors', function () {
    var E = typedError('E')
    var innerE = new Error()
    var e = new E(innerE)
    e.inner.should.equal(innerE)
  })

  it('signature with message and inner error', function () {
    var E = typedError('E')
    var innerE = new Error('bar')
    var e = new E('foo', innerE)
    e.message.should.equal('foo')
    e.inner.should.equal(innerE)
  })

})