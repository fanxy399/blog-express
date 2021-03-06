
const fs = require('fs')
const path = require('path')
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session')
const RedisStore = require('connect-redis')(session)

var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


const env = process.env.NODE_ENV
if(env !== 'production'){
  app.use(logger('dev'));
}else{
  const accessLog = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(accessLog,{
    flags: 'a'
  })
  app.use(logger('combined',{
    stream: writeStream
  }));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({
  resave: true, //添加 resave 选项
  saveUninitialized: true, //添加 saveUninitialized 选项
  secret: 'secret-key', // 自定义密钥
  cookie: {
    path: '/', // 默认配置
    httpOnly: true, // 默认配置
    maxAge: 24*60*60*100
  },
  store: sessionStore
}))

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
