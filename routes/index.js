'use strict';
/*
 * Created by wwxiong on 2016/02/24.
 */
var express = require('express');
var router = express.Router();
var userRouters = require('./users');

module.exports = function(app){
  /* 加载中间件 */

  /* 加载路由 */
    router.get('/', function(req, res,next){
        res.redirect('/api-docs');
    });
    app.use(router);
    app.use('/auth', userRouters);
};
