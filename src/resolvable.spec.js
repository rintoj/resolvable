const chai = require('chai')
const spies = require('chai-spies')
const resolvable = require('../dist/resolvable')

const {
  expect
} = chai
chai.use(spies);

function callbackSuccess(target) {
  target(undefined, 1)
}

function callbackError(target) {
  target('Undefined error', undefined)
}

function callbackWithArgs(a, b, target) {
  a === b ? target(undefined, a + b) : target('Undefined error', undefined)
}

describe('resolvable', () => {

  it('must be a function', () => {
    expect(resolvable).be.a.function
  })

  it('must accept a function', () => {
    expect(() => {
      resolvable(function() {})
    }).not.to.throw()
  })

  it('must reject non functional param with an error', () => {
    expect(() => {
      resolvable({})
    }).to.throw()
  })

  it('must return a promise when a NodeJS style function is decorated', () => {
    const result = resolvable(callbackSuccess)()
    expect(result).be.a.promise
  })

  it('must return a promise and resolve on success', (done) => {
    const result = resolvable(callbackSuccess)()
    result.then(data => {
      expect(data).be.equal(1)
      done()
    })
  })

  it('must return a promise and reject on error', (done) => {
    const result = resolvable(callbackError)()
    result.then(undefined, error => {
      expect(error).be.equal('Undefined error')
      done()
    })
  })

  it('must return a promise and resolve on success', (done) => {
    const result = resolvable(callbackWithArgs)(1, 1)
    result.then(data => {
      expect(data).be.equal(2)
      done()
    })
  })

  it('must accept arguments and reject if error', (done) => {
    const result = resolvable(callbackWithArgs)(1, 2)
    result.then(undefined, error => {
      expect(error).be.equal('Undefined error')
      done()
    })
  })

})