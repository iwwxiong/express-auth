'use strict';
/**
 * Created by wwxiong on 2016/01/11
 */
var uuid = require('node-uuid');
var async = require('async');

var models = require('../models');
var UserAuth = models.UserAuth;
var UserProfile = models.UserProfile;
var Group = models.Group;
var Permission = models.Permission;
var UserGroup = models.UserGroup;
var UserPermission = models.UserPermission;
var GroupPermission = models.GroupPermission;

/* Set extend function
 * > var a = new Set();
 * > var b = new Set();
 * > a.add(1);
 * > a.add(2);
 * > b.add(3);
 * > a.extend(b);
 * > a;
 * > Set {1, 2, 3}
 */
Set.prototype.extend = function(i){
  var _self = this;
  if(i instanceof Set)
    i.forEach(function(item){
      _self.add(item);
    });
    return;
  _self.add(i);
};

/* 获取用户群组ID
 * Promise
 * - Set
 */
var _getUserGroupIds = function(userId){
  return new Promise(function(resolve, reject){
    UserGroup.find({userId: userId}, function(err, groups){
      if(err)
        reject(err);
      var gs = new Set();
      for(let i=0; i<groups.length; i++){
        gs.add(groups[i].groupId);
      }
      resolve(gs);
    });
  });
};

/*
 * 新建用户
 */
exports.newUser = function(username, name, sex, age, telephone){
  return new Promise(function(resolve, reject){
    var u = UserProfile();
    u.username = username;
    u.name = name;
    u.sex = sex;
    u.age = age;
    u.telephone = telephone;
    u.save(function(err){
      if(err)
        reject(err);
      resolve(u);
    });
  });
};

/*
 * 新建群组
 */
exports.newGroup = function(name){
  return new Promise(function(resolve, reject){
    var g = Group();
    g.name = name;
    g.save(function(err){
      if(err)
        reject(err)
      resolve(g);
    });
  });
};

/*
 * 新建权限
 */
exports.newPermission = function(name, description){
  return new Promise(function(resolve, reject){
    var p = Permission();
    p.name = name;
    p.description = description;
    p.save(function(err){
      if(err)
        reject(err);
      resolve(p);
    });
  });
};

/*
 * 根据用户ID获取用户
 */
exports.getUserById = function(userId){
  return new Promise(function(resolve, reject){
    UserProfile.findOne({_id: userId}, function(err, u){
      if(err)
        reject(err);
      resolve(u);
    });
  });
};

/*
 * 根据用户名获取用户
 */
exports.getUserByUsername = function(username){
  return new Promise(function(resolve, reject){
    UserProfile.findOne({username: username}, function(err, u){
      if(err)
        reject(err);
      resolve(u);
    });
  });
};

/*
 * 根据查询条件获取用户信息
 * return Promise
 */
exports.getUsersByQuery = function(Q, opt){
  // UserProfile.find(Q, null, opt, cb);
  return new Promise(function(resolve, reject){
    UserProfile.find(Q, null, opt, function(err, u){
      if(err)
        reject(err);
      resolve(u);
    });
  });
};

/*
 * 获取用户群组列表信息
 * return, 返回Promise
 * - Set 群组名称
 */
exports.getUserGroups = function(userId){
  var ugids = _getUserGroupIds(userId);
  return new Promise(function(resolve, reject){
    ugids.then(function(data){
      Group.find({_id: {'$in': Array.from(data)}}, function(err, g){
          if(err)
            reject(err);
          let gn = new Set();
          for(let i=0; i<g.length; i++){
            gn.add(g[i].name);
          }
          resolve(gn);
      });
    });
  });
};

/*
 * 获取群组权限列表信息
 * return, 返回Promise
 * - results(Set)
 */
exports.getGroupPermissions = function(groupId){
  return new Promise(function(resolve, reject){
    var permissions = new Set();
    async.waterfall([
      function(cb){
        GroupPermission.find({groupId: groupId}, function(err, gps){
          cb(err, gps);
        });
      },
      function(gps, cb){
        var pids = new Set();
        for(let i=0; i<gps.length; i++){
          pids.add(gps[i].permissionId);
        }
        Permission.find({_id: {'$in': Array.from(pids)}}, function(err, p){
          if(!err){
            for(let j=0; j<p.length; j++){
              permissions.add(p[j].name);
            }
          }
          cb(err, permissions);
        });
      }
    ], function(err, results){
      if(err)
        reject(err);
      resolve(results);
    });
  });
};

/*
 * 获取用户权限列表信息(用户所有群组权限+用户权限，然后去重Set)
 * return, 返回Promise
 * - permissions：权限列表(Set)
 */
exports.getUserPermissions = function(userId){
  /* 获取用户群组 */
  var uG = _getUserGroupIds(userId);
  /* 获取群组权限ids */
  var gP = new Promise(function(resolve, reject){
    uG.then(function(data){
      var gids = data;
      GroupPermission.find({groupId: {'$in': Array.from(gids)}}, function(err, ps){
        if(err)
          reject(err);
        // resolve(new Set(ps));
        var pids = new Set();
        for(let j=0;j<ps.length;j++){
          pids.add(ps[j].permissionId);
        }
        resolve(pids);
      });
    });
  });
  /* 直接查询用户权限ids */
  var uP = new Promise(function(resolve, reject){
    UserPermission.find({userId: userId}, function(err, p){
      if(err)
        reject(err);
      // resolve(p);
      var pids = new Set();
      for(let j=0; j<p.length; j++){
        pids.add(p[j].permissionId);
      }
      resolve(pids);
    });
  });

  return new Promise(function(resolve, reject){
    Promise.all([gP, uP]).then(function(d){
      d[0].extend(d[1]);
      Permission.find({_id: {'$in': Array.from(d[0])}}, function(err, p){
        if(err)
          reject(err);
        var permissions = new Set();
        for(let m=0; m<p.length; m++){
          permissions.add(p[m].name);
        }
        resolve(permissions);
      });
    });
  });
};
