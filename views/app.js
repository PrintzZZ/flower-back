var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken'); //token模块

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var addRouter = require('./routes/address');
var prosRouter = require('./routes/pro');
var cartRouter = require('./routes/cart');
var bannerRouter = require('./routes/banner');
var commentRouter = require('./routes/comment');
var headimgRouter = require('./routes/headimg');
var orderRouter = require('./routes/order');


var app = express();

//解决图片上传时,提示Payload Too Large的问题
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//加入全局token验证(在路由前) 2019.11.07 10:15
app.use((req, res, next) => {
  if (req.url !== '/users/login' && req.url !== '/users/register' && req.url !== '/banner') {
    let token = req.headers.token || req.query.token || req.body.token;
    if (token) {
      jwt.verify(token, 'flower', function(err, decoded) {
        if (err) {
          res.send({ 
            code: '10119', 
            message: '没有找到token.' 
          });
        } else {
          req.decoded = decoded;  
          console.log('验证成功', decoded);
          next()
        }
      }) 
    } else {
      res.send({ 
        code: '10119', 
        message: '没有找到token.' 
      });
    }
  } else {
    next()
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/address', addRouter);
app.use('/pro', prosRouter);
app.use('/cart', cartRouter);
app.use('/banner', bannerRouter);
app.use('/comment', commentRouter);
app.use('/headimg', headimgRouter);
app.use('/order', orderRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
