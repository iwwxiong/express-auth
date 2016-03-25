/**
 * Created by waiwaixiong on 2014/07/10.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SessionStore = require("connect-mongo")(session);
var multiparty = require('connect-multiparty');
var favicon = require('static-favicon');
var logger = require('morgan');
var path = require('path');
var app = express();

// 导入自定义模块
var router = require('./routes');
var swagger = require('./swaggers');
var config = require('./config_default');

//// 配置views目录和模板语言
app.use(favicon(path.join(__dirname, '/public/img/w.jpg')));
app.use(logger('dev'));

// 静态文件css, js, img
app.use(express.static(__dirname + '/public'));
app.use(multiparty());
app.use(bodyParser());
app.use(cookieParser());
app.use(session({
  key: 'session_id',
  store: new SessionStore({
    url: config.storeUri
  }),
  cookie: {maxAge: 1000*3600*24*7},
  secret: config.sessionSecret
}));

router(app);
swagger(app);

module.exports = app;
