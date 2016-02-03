var model = require('./models');
var G = model.Group;
var P = model.Permission;
var GP = model.GroupPermission;

GP.find({groupId: '569dcfe669a66e6c2e000003'}, function(err, gps){
    //console.log(gps);
    var pids = new Set();
    for(var i=0; i<gps.length; i++){
      pids.add(gps[i].permissionId);
    }
    P.find({_id: {'$in': Array.from(pids)}}, function(err, p){
        console.log(p);
    });
});

var proxy = require('./proxy/user');
proxy.getUserGroups('56a1a27961c696df14b7e1cf').then(function(data){console.log(data);});
proxy.getUsersByQuery({_id: '56a1a27961c696df14b7e1cf'}).then(function(data){console.log(data);}).catch(function(data){console.log(data);});
proxy.newGroup('权限管理').then(function(data){console.log(data);});
proxy.getUserByUsername('wwxiong').then(function(data){console.log(data);});