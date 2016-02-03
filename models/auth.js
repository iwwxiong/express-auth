/**
 * Created by waiwaixiong on 2014/07/14.
 */
var mongoose = require('mongoose');
var plugins = require('./plugins');
var validation = require('../lib/validation');
var cryptoPassword = require('../lib/utils').cryptoPassword;
// 导入加密模块对密码进行hashing加密,采用sha256加密
var crypto = require('crypto');
var check = require('validator').check;
var async = require('async');

var LocalUserAuthSchema = new mongoose.Schema({
});

// Defining user profile schema
var UserProfileSchema = new mongoose.Schema({
    // string type没有長短限制参数，只能匹配正则表达式来验证
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    telephone: {type: String, required: true},
    is_admin: {type: Boolean, required: true, default: false}, // 超級管理員
    is_system: {type: Boolean, default: false},  // 平臺管理員
    last_login: {type: Date},
    modify_date: {type: Date},
    create_date: {type: Date, default: Date.now},
    //未能方便查詢使用，保存群組所有信息，不僅僅是ID
    group_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'auth_group'}]
    // permission_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'auth_permission'}]
    //group_id: []
});
// UserSchema.plugin(plugins.modifyDatePlugin);
UserSchema.index({username: 1});

// 可做刪除記錄log使用
//UserSchema.post('init', function(doc){
//    this.group_id = 'abc';
//});

// Password verification method
UserSchema.method('verifyPassword', function(password, callback) {
    if (this.password === cryptoPassword(password)) {return callback(null, true);}
    return callback(null, false);
});

// 獲取所有權限
//UserSchema.method.allPermissions = function(){
//    return async.concat(this.group_id, function(item, cb){
//        Group.findOne({_id: item._id}, "permission_id", function(err, perm){
//            cb(err, perm);
//        });
//    }, function(err, results){
//        return results;
//    });
//};

UserSchema.statics.findByParams = function(Q, cb){
    this.find(Q)
        .select('username name email department telephone last_login group_id')
        .exec(cb);
};

// validate username and password
UserSchema.statics.authenticate = function(username, password, cb){
    this.findOne({'username': username}, function(err, user){
        if (err) return cb(err);
        if (!user) return cb(err, false);
        user.verifyPassword(password, function(err, passwordCorrect){
            if (err) return cb(err);
            if (!passwordCorrect) return cb(null, false);
            return cb(null, user);
        });
    });
};
// Defining auth_group schema
var GroupSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    type_id: {type: mongoose.Schema.ObjectId, ref: "notice_type"}, // 比如公告的類型。。
    // group_user: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'}],
    permission_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'auth_permission'}]
   // permission_id: []
});

// Defining auth_permission schema
var PermissionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    codename: {type: String, required: true, unique: true}
});

// 创建model
var User = mongoose.model('auth_user', UserSchema);
var Group = mongoose.model('auth_group', GroupSchema);
var Permission = mongoose.model('auth_permission', PermissionSchema);

User.schema.path('email').validate(function(value) {
    return validation.emailReg.test(value);
}, validation.emailMsg);

//User.schema.path('password').validate(function(value){
//    return validation.passReg.test(value);
//}, validation.passMsg);

module.exports = {
    User: User,
    Group: Group,
    Permission: Permission,

    // TODO 功能待完善
    createUser: function(params, cb){
        params.password = cryptoPassword(params.password);
        var user = new User(params);
        user.save(cb);
    },

    /**
     * 驗證用戶名密碼是否正確
     * @param {String}username
     * @param {String}password
     * @param {Function}callback
     */
    authenticate: function(username, password, callback){
        User.findOne({username: username}, function(err, user){
            if (err) return callback(err);
            if (!user) return callback(err, false);
            user.verifyPassword(password, function(err, passwordCorrect){
                if (err) return callback(err);
                if (!passwordCorrect) return callback(null, false);
                return callback(null, user);
            });
        });
    },

    /**
     * 創建群組
     * @param params  一般包括名稱，類型，和權限列表
     * @param cb
     */
    createGroup: function(params, cb){
        var group = new Group(params);
        group.save(cb);
    },

    /**
     * 根據用戶的組ID查詢所有的權限，以數組的形式返回
     * @param group
     */
    getAllPerms: function(groups){
        async.concat(groups, function(item, cb){
            Group.findById(item)
                .populate('permission_id')
                .exec(function(err, group){
                    cb(err, group);
                });
        }, function(err, results){
            console.log(results);
            return results;
        });
    }
};
