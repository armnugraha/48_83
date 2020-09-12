var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index')
var authRouter = require('./routes/auth')
var usersRouter = require('./routes/users')
var mountsRouter = require('./routes/mounts')
var mountFilesRouter = require('./routes/mount_files')
var mountCloseRouter = require('./routes/mount_close')
var reviewsRouter = require('./routes/reviews')
var rolesRouter = require('./routes/roles')
var gearsRouter = require('./routes/gears')
var seedersRouter = require('./routes/seeds')

var app = express()

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'html')

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS, PATCH');
  next();
});

app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/mounts', mountsRouter)
app.use('/mount_files', mountFilesRouter)
app.use('/mount_close', mountCloseRouter)
app.use('/reviews', reviewsRouter)
app.use('/roles', rolesRouter)
app.use('/gears', gearsRouter)
app.use('/seeders', seedersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send({ status: 'error', message: 'opps something wrong, please contact sysadmin' })
})

module.exports = app