'use strict';
/*
 * Created by wwxiong on 2016/01/25.
 */
var model = require('../models');
var Group = model.Group;
var Permission = model.Permission;
var proxy = require('../proxy');
var userProxy = proxy.User;

/*
  API RETURN FORMAT
  {
    'code': number, #API custom code
    'result': true or false,
    'message': '',  # error message
    'data': '' # data items
  }
*/

/*
 * 查看所有用户
 */
exports.getUsers = function(req, res, next){
  userProxy.getUsersByQuery({}, {}).then(function(users){
    return res.send({
      'result': true,
      'data': users
    });
  }).catch(function(err){
    return next(err);
  });
};

/*
 * 新增用户信息
 */
exports.postUser = function(req, res, next){
  let username = req.body.username;
  let name = req.body.name;
  let age = req.body.age;
  let sex = req.body.sex;
  let telephone = req.body.telephone;
  userProxy.getUserByUsername(username).then(function(user){
    if(user)
      return res.send({'result': false, 'message': '用户名已存在'});
    userProxy.newUser(username, name, sex, age, telephone).then(function(u){
      return res.send({
        'result': true,
        'data': u
      });
    });
  });
};


/*
 * 根据用户ID获取用户
 */
exports.getUser = function(req, res, next){
  var userId = req.params.userId;
  userProxy.getUserById(userId).then(function(user){
    return res.send({
      'result': true,
      'data': user
    });
  }).catch(function(err){
    return next(err);
  });
};

/*
 * 获取用户群组信息
 */
exports.getGroups = function(req, res, next){
  var userId = req.params.userId;
  Group.find({}, function(err, groups){
    if(groups){
      return res.send({
        'result': true,
        'data': groups
      });
    }
  });
};

/*
 * 添加用户群组
 */
exports.postGroup = function(req, res, next){
  var name = req.body.name;  //课群名称
  Group.findOne({'name': name}, function(err, group){
    if(err, group){
      return res.send({'result': false, 'message': '群组已存在'});
    }
    userProxy.newGroup(name).then(function(data){
      return res.send({'result': true, 'data': data});
    }).catch(function(err){
      return next(err);
    });
  });
};

/*
 * 根据群组ID获取群组信息
 */
exports.getGroupById = function(req, res, next){
  var groupId = req.params.groupId;
  Group.findOne({_id: groupId}, function(err, group){
    if(group){
      return res.send({'result': true, 'data': group});
    }
  });
};

/*
 * 根据群组ID修改群组信息
 */
exports.putGroup = function(req, res, next){
  var groupId = req.params.groupId;
  var name = req.body.name;
  Group.findOne({_id: groupId}, function(err, group){
    if(group){
      group.name = name;
      group.save(function(err){
        if(!err){
          return res.send({'result': true, 'data': group});
        }
      });
    }
  });
};

/*
 * 获取权限列表信息
 */
exports.getPermissions = function(req, res, next){
  Permission.find({}, function(err, permissions){
    if(permissions){
      return res.send({'result': true, 'data': permissions});
    }
  });
};

/*
 * 获取权限列表信息
 */
exports.postPermission = function(req, res, next){
  var name = req.body.name;
  var description = req.body.description;
  Permission.findOne({'name': name}, function(err, permission){
    if(permission){
      return res.send({'result': false, 'message': '权限已存在'});
    }
    userProxy.newPermission(name, description).then(function(p){
      return res.send({'result': true, 'data': p});
    });
  });
};

/*
 * 获取权限列表信息
 */
exports.getPermissionById = function(req, res, next){
  var permissionId = req.params.permissionId;
  Permission.findOne({_id: permissionId}, function(err, permission){
    if(!permission){
      return res.send({'result': false, 'data': '权限未找到'});
    }
    return res.send({'result': true, 'data': permission});
  });
};

/*
 * 修改权限
 */
exports.putPermission = function(req, res, next){
  var permissionId = req.params.permissionId;
};

/*
 * 获取用户所有权限
 */
exports.getUserPermissions = function(req, res, next){
  var userId = req.params.userId;
  userProxy.getUserPermissions(userId).then(function(data){
    res.send({'result': true, 'data': Array.from(data)});
  }).catch(function(err){
    return next(err);
  });
};

/*
 * 获取用户所属组
 */
exports.getUserGroups = function(req, res, next){
  var userId = req.params.userId;
  userProxy.getUserGroups(userId).then(function(data){
    res.send({'result': true, 'data': Array.from(data)});
  }).catch(function(err){
    return next(err);
  });
};

/*
 * 获取组权限
 */
exports.getGroupPermissions = function(req, res, next){
  var groupId = req.params.groupId;
  userProxy.getGroupPermissions(groupId).then(function(data){
    res.send({'result': true, 'data': Array.from(data)});
  }).catch(function(err){
    return next(err);
  });
};
