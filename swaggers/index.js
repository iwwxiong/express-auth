'use strict';
/*
 * Created by wwxiong on 2016/02/24.
 */
var config = require('../config_default');
var swaggerDoc = require('../libs/swagger-doc');
var swaggerServer = require('../libs/swagger');
var userDoc = require('./users');

module.exports = function(app){
  swaggerDoc.configure(app, {
    discoveryUrl: config.discoveryUrl,
    version:    config.version,
    basePath:   config.basePath
  });
  // 生成swagger路由
  userDoc(swaggerDoc);

  swaggerServer.initServer(app, {
    server: 'express'
    // pathResource: config.pathResource
  });
};
