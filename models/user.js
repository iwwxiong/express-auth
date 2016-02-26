/**
 * Created by wwxiong on 2016/01/11
 */

var mongoose = require('mongoose');

// 本地用户认证
var LocalUserAuthSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user_profile'},
  password: {type: String, required: true},
  salt: {type: String, required: true},
  modified: {type: Date},
  created: {type: Date, default: Date.now}
});

LocalUserAuthSchema.index({userId: 1}, {unique: true});

// 用户信息
var UserProfileSchema = new mongoose.Schema({
  name: {type: String, required: false},
  sex: {type: String, required: true},
  age: {type: Number, min: 1, max: 150},  //
  telephone: {type: Number},
  isAdmin: {type: Boolean, default: false}, // 平台超级管理员
  modified: {type: Date},
  created: {type: Date, default: Date.now},
});

UserProfileSchema.index({unique: true});

// 组
var GroupSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true}
});

// 权限
var PermissionSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  description: {type: String, required: false}  // 权限描述
});

// 用户组
var UserGroupSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user_profile'},
  groupId: {type: mongoose.Schema.Types.ObjectId, ref: 'group'}
});

// 用户权限
var UserPermissionSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user_profile'},
  permissionId: {type: mongoose.Schema.Types.ObjectId, ref: 'permission'}
});

// 组权限
var GroupPermissionSchema = new mongoose.Schema({
  groupId: {type: mongoose.Schema.Types.ObjectId, ref: 'group'},
  permissionId: {type: mongoose.Schema.Types.ObjectId, ref: 'permission'}
});


mongoose.model('user_auth', LocalUserAuthSchema);
mongoose.model('user_profile', UserProfileSchema);
mongoose.model('group', GroupSchema);
mongoose.model('permission', PermissionSchema);
mongoose.model('user_group', UserGroupSchema);
mongoose.model('user_permission', UserPermissionSchema);
mongoose.model('group_permission', GroupPermissionSchema);
