/* eslint-disable no-undef */
var assert = require('assert')
var jwt = require('../jwt')

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.strictEqual([1, 2, 3, 4, 5].indexOf(0), -1)
    })
  })
})

describe('JWT', function () {
  describe('#signAndVerify()', function () {
    it('should return valid jwt token and verify the token', function () {
      var token = jwt.sign({ data: 'test' })
      var long = jwt.verifyLong(token.long)
      var short = jwt.verifyShort(token.short)
      var errToken = jwt.verifyShort(token.long)
      if (long.status === 'error' || short.status === 'error' || errToken === 'ok') {
        const err = { code: '403', message: 'invalid token test' }
        throw err
      }
    })
  })
})
