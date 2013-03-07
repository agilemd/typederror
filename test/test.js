var chai = require('chai')
chai.should()

var typedError = require('../index')

describe('typedError', function () {
  it('returns a TypedError', function () {
    typedError().should.be.a('function')
  })

})

describe('TypedError', function () {
  it('is instanceof Error', function () {
    var MyError = typedError('MyError')
    var err = new MyError()
    err.should.be.instanceof(Error)
  })
})