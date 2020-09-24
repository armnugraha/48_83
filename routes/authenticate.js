const jwt = require('../jwt')

module.exports = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token
    var check = jwt.verifyLong(token, process.env.SECRET_KEY)
    if (check.status == "error") return res.sendStatus(403)
    next()
}