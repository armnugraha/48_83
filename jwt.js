const fs = require('fs')
const jwt = require('jsonwebtoken')
const issuer = 'siliwangi-0.1'
const privateKEY = fs.readFileSync('./private.key', 'utf8')
const publicKEY = fs.readFileSync('./public.key', 'utf8')

const longOptions = {
  issuer: issuer,
  expiresIn: '1h',
  algorithm: 'RS256'
}

const shortOptions = {
  issuer: issuer,
  expiresIn: '30d',
  algorithm: 'RS256'
}

module.exports = {
  sign: (payload) => {
    var token = {
      long: jwt.sign(payload, privateKEY, longOptions),
      short: jwt.sign(payload, privateKEY, shortOptions)
    }

    return token
  },

  refresh: (payload) => {
    return jwt.sign(payload, privateKEY, shortOptions)
  },

  verifyShort: (token) => {
    try {
      return { status: 'ok', data: jwt.verify(token, publicKEY, shortOptions) }
    } catch (err) {
      return { status: 'error', message: 'invalid token' }
    }
  },

  verifyLong: (token) => {
    try {
      return { status: 'ok', data: jwt.verify(token, publicKEY, longOptions) }
    } catch (err) {
      return { status: 'error', message: 'invalid token' }
    }
  },

  decode: (token) => {
    return jwt.decode(token, { complete: true })
    // returns null if token is invalid
  }
}
