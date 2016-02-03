/**
 * Created by wwxiong on 2016/01/11
 */

var config = require('../config_default');
var mongoose = require('mongoose');

mongoose.connect(config.db, {
    server: {poolSize: config.poolSize}
});

require('./user');

exports.UserAuth = mongoose.model('user_auth');
exports.UserProfile = mongoose.model('user_profile');
exports.Group = mongoose.model('group');
exports.Permission = mongoose.model('permission');
exports.UserGroup = mongoose.model('user_group');
exports.UserPermission = mongoose.model('user_permission');
exports.GroupPermission = mongoose.model('group_permission');
