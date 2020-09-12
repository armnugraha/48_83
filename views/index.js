module.exports = (...params) => {
  let status = 'error'
  let message = null
  let data = null

  if (typeof params[0] === 'string') {
    message = params[0]
  } else {
    status = 'ok'
    data = params[0]
  }

  return { data: data, status: status, message: message }
}
