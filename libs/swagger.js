/**
 * Created by waiwaixiong on 2014/07/09.
 */

var path = require('path');
var fs = require('fs');
// 暫時去除restify
// var restify = require('../node_modules/restify');
var express = require('express');

exports.initServer = function(serverObj, options){
    /**
     * init express or restify server .
     * @param  {serverObj} server  A server object from express or restify.
     * @param  {options} {server: express or restify, pathResource: string}
     */
    var distPath = path.join(__dirname, '../node_modules/swagger-ui/dist');
    // var basePathResource = options.pathResource;
    var apiDocs = path.join(__dirname, '../views/swagger/api-docs.html');

    if (options.server == 'express'){
        serverObj.use(express.static(distPath))
        // serverObj.use(express.static(distPath));
        serverObj.get('/api-docs', function(req, res){
            res.sendfile(apiDocs);
        })
    }
//    else{
//        serverObj.get(/css\/?.*|\/lib\/?.*|\/images\/?.*|\.js/, restify.serveStatic({
//            'directory': distPath
//        }));
//        serverObj.get(/api-docs\.html\/?.*/, restify.serveStatic({
//            'directory': __dirname
//        }));
//    }
};