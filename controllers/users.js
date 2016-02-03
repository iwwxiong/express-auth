'use strict';
/*
 * Created by wwxiong on 2016/01/25.
 */
var proxy = require('./proxy');
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
exports.getUsers = function(res, req, next){
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
exports.postUser = function(res, req, next){
  let username = req.params.username;
  let name = req.params.name;
  let age = req.params.age;
  let sex = req.params.sex;
  let age = req.params.age;
  let email = req.params.email;
  let telephone = req.params.telephone;
  userProxy.getUserByUsername(username).then(function(user){
    if(user)
      return res.send({'result': false, 'message': '用户名已存在'});
    userProxy.newUser(username, name, sex, age, email, telephone).then(function(u){
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
exports.getUser = function(res, req, next){
  var userId = req.params.userId;
  user.Proxy.getUserById(userId).then(function(user){
    return res.send({
      'result': true,
      'data': user
    });
  }).catch(function(err){
    return next(err);
  });
};
