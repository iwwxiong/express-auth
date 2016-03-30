/*
 * Created by teddy on 2016/03/29.
 */
var async = require('async');
var should = require('should');
var app = require('../app');
var models = require('../models');
var UserProfile = models.UserProfile;
var Group = models.Group;
var Permission = models.Permission;
var UserGroup = models.UserGroup;
var UserPermission = models.UserPermission;
var GroupPermission = models.GroupPermission;
var supertest = require('supertest');
var request = supertest(app);

var initDB = function(callback){
  async.parallel([
    function(cb){
      UserProfile.collection.drop(cb);
    },
    function(cb){
      Group.collection.drop(cb);
    },
    function(cb){
      Permission.collection.drop(cb);
    },
    function(cb){
      UserGroup.collection.drop(cb);
    },
    function(cb){
      UserPermission.collection.drop(cb);
    },
    function(cb){
      GroupPermission.collection.drop(cb);
    },
  ], function(err, results){
    callback();
  });
};

var u, g1, g2, p1, p2, p3, p4, p5, p6, ug1, ug2, g1p2, g1p3, g2p4, g2p5, up1, up2;

describe('test/app.test.js', function () {
  before(function(done){
    // 导入测试数据（考虑通过脚本导入，暂时手动写入）
    async.series([
      function(cb){
        initDB(cb);
      },
      function(cb){
        u = new UserProfile({username: 'Teddy',name: '泰迪熊',sex: '男',age: 20,telephone: 13112341234});
        u.save(cb);
      },
      function(cb){
        g1 = new Group({name: '角色管理'});
        g1.save(cb);
      },
      function(cb){
        g2 = new Group({name: '权限管理'});
        g2.save(cb);
      },
      function(cb){
        p1 = new Permission({name: 'add user', description: '添加用户'});
        p1.save(cb);
      },
      function(cb){
        p2 = new Permission({name: 'edit user', description: '编辑用户'});
        p2.save(cb);
      },
      function(cb){
        p3 = new Permission({name: 'delete user', description: '删除用户'});
        p3.save(cb);
      },
      function(cb){
        p4 = new Permission({name: 'add perm', description: '添加权限'});
        p4.save(cb);
      },
      function(cb){
        p5 = new Permission({name: 'edit perm', description: '编辑权限'});
        p5.save(cb);
      },
      function(cb){
        p6 = new Permission({name: 'delete perm', description: '删除权限'});
        p6.save(cb);
      },
      function(cb){
        ug1 = new UserGroup({userId: u._id, groupId: g1._id});
        ug1.save(cb);
      },
      function(cb){
        ug2 = new UserGroup({userId: u._id, groupId: g2._id});
        ug2.save(cb);
      },
      function(cb){
        g1p2 = new GroupPermission({groupId: g1._id, permissionId: p2._id});
        g1p2.save(cb);
      },
      function(cb){
        g1p3 = new GroupPermission({groupId: g1._id, permissionId: p3._id});
        g1p3.save(cb);
      },
      function(cb){
        g2p4 = new GroupPermission({groupId: g2._id, permissionId: p4._id});
        g2p4.save(cb);
      },
      function(cb){
        g2p5 = new GroupPermission({groupId: g2._id, permissionId: p5._id});
        g2p5.save(cb);
      },
      function(cb){
        up1 = new UserPermission({userId: u._id, permissionId: p1._id});
        up1.save(cb);
      },
      function(cb){
        up6 = new UserPermission({userId: u._id, permissionId: p6._id});
        up6.save(cb);
      }
    ], function(err, results){
      if(err){
        return done(err);
      }
      done();
    });
  });

  it('test api /auth/users', function(done){
    request.get('/auth/users').query({page: 1}).end(function(err, res){
      var j = JSON.parse(res.text);
      (j.result).should.equal(true);
      (j.data.length).should.equal(1);
if(err){
      return done(err);
    }
    done();
    });
  });

  it('test api /auth/user/:userId', function(done){
    request.get('/auth/user/'+u._id).end(function(err, res){
      var j = JSON.parse(res.text);
      (j.result).should.equal(true);
      (j.data._id).should.equal(u._id.toString());
      if(err){
        return done(err);
      }
      done();
    });
  });

  it('test api /auth/groups', function(done){
    request.get('/auth/groups').query({page: 1}).end(function(err, res){
      var j = JSON.parse(res.text);
      j.result.should.equal(true);
      j.data.length.should.equal(2);
      if(err){
        return done(err);
      }
      done();
    })
  });

  it('test api /auth/group/:groupId', function(done){
    request.get('/auth/group/'+g1._id).end(function(err, res){
      var j = JSON.parse(res.text);
      j.data.name.should.equal('角色管理');
      if(err){
        return done(err);
      }
      done();
    })
  });

  it('test api /auth/group/:groupId error', function(done){
    request.get('/auth/group/56fba8641555c108b7xxxxxx').end(function(err, res){
      var j = JSON.parse(res.text);
      should(j.data).be.exactly(null);
      if(err){
        return done(err);
      }
      done();
    })
  });

  it('test api /auth/permissions', function(done){
    request.get('/auth/permissions').query({page: 1}).end(function(err, res){
      var j = JSON.parse(res.text);
      j.data.length.should.equal(6);
      if(err){
        return done(err);
      }
      done();
    })
  });

  it('test api /auth/permission/:permissionId', function(done){
    request.get('/auth/permission/'+p1._id).end(function(err, res){
      var j = JSON.parse(res.text);
      j.data.name.should.equal('add user');
      if(err){
        return done(err);
      }
      done();
    })
  });

  it('test api /auth/permission/:permissionId error', function(done){
    request.get('/auth/permission/56fba8641555c108b7xxxxxx').end(function(err, res){
      var j = JSON.parse(res.text);
      should(j.data).be.exactly(null);
      if(err){
        return done(err);
      }
      done();
    })
  });

  it('test api auth/user/:userId/permissions', function(done){
    request.get('/auth/user/'+u._id+'/permissions').end(function(err, res){
      var j = JSON.parse(res.text);
      j.data.length.should.equal(6);
      j.data.should.containEql('delete user');
      if(err){
        return done(err);
      }
      done();
    })
  });

  it('test api /auth/user/:userId/groups', function(done){
    request.get('/auth/user/'+u._id+'/groups').end(function(err, res){
      var j = JSON.parse(res.text);
      j.data.length.should.equal(2);
      j.data.should.containEql('角色管理');
      if(err){
        return done(err);
      }
      done();
    })
  });

  it('test api /auth/group/:groupId/permissions', function(done){
    request.get('/auth/group/'+g1._id+'/permissions').end(function(err, res){
      var j = JSON.parse(res.text);
      j.data.length.should.equal(2);
      j.data.should.containEql('edit user');
      if(err){
        return done(err);
      }
      done();
    })
  });

  after(function(done){
    // 清除数据
    initDB();
    done();
  });
});
