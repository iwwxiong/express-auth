'use strict';
/*
 * Created by wwxiong on 2016/02/24.
 */
module.exports = function(swagger){
  var userDocs = swagger.createResource('/api/users/doc' , {description: '用户管理'});
  userDocs.get('/users', {
    notes: "获取所有用户列表信息",
    nickname: "getUsers",
    summary: "用户列表信息",
    parameters: [
      {name: 'page', description: "页码", required:true, dataType: "integer", paramType: "query"},
      {name: 'page_size', description: "每页大小", required:false, dataType: "integer", paramType: "query"}
    ]
  });

  userDocs.post('/users', {
    notes: "新增用户信息（姓名，性别，年龄，电话）",
    nickname: "postUsers",
    summary: "新增用户信息",
    parameters: [
      {name: 'name', description: "姓名", required:true, dataType: "string", paramType: "form"},
      {name: 'sex', description: "性别", required:true, dataType: "string", paramType: "form"},
      {name: 'age', description: "年龄", required:true, dataType: "integer", paramType: "form"},
      {name: 'telephone', description: "电话", required:true, dataType: "string", paramType: "form"}
    ]
  });

  userDocs.get('/user/{userId}', {
    notes: "根据用户ID获取用户信息",
    nickname: "getUser",
    summary: "用户信息",
    parameters: [
      {name: 'userId', description: "用户ID", required:true, dataType: "string", paramType: "path"}
    ]
  });

  userDocs.get('/groups', {
    notes: "获取所有群组列表信息",
    nickname: "getGroups",
    summary: "群组列表信息",
    parameters: [
      {name: 'page', description: "页码", required:true, dataType: "integer", paramType: "query"},
      {name: 'page_size', description: "每页大小", required:false, dataType: "integer", paramType: "query"}
    ]
  });

  userDocs.post('/groups', {
    notes: "添加群组信息（群组名称）",
    nickname: "postGroups",
    summary: "添加群组信息",
    parameters: [
      {name: 'name', description: "群组名称", required:true, dataType: "string", paramType: "form"}
    ]
  });

  userDocs.get('/group/{groupId}', {
    notes: "根据群组ID获取群组信息",
    nickname: "getGroup",
    summary: "群组信息",
    parameters: [
      {name: 'groupId', description: "群组ID", required:true, dataType: "string", paramType: "path"}
    ]
  });

  userDocs.put('/user/{userId}', {
    notes: "根据用户ID编辑用户信息",
    nickname: "putGroup",
    summary: "编辑信息",
    parameters: [
      {name: 'groupId', description: "群组ID", required:true, dataType: "string", paramType: "path"},
      {name: 'name', description: "群组名称", required:true, dataType: "string", paramType: "form"}
    ]
  });

  userDocs.get('/permissions', {
    notes: "获取所有权限列表信息",
    nickname: "getPermission",
    summary: "权限列表信息",
    parameters: [
      {name: 'page', description: "页码", required:true, dataType: "integer", paramType: "query"},
      {name: 'page_size', description: "每页大小", required:false, dataType: "integer", paramType: "query"}
    ]
  });

  userDocs.post('/permissions', {
    notes: "添加权限信息（权限名称）",
    nickname: "postPermission",
    summary: "添加权限信息",
    parameters: [
      {name: 'name', description: "权限代码", required:true, dataType: "string", paramType: "form"},
      {name: 'description', description: "权限描述", required:true, dataType: "string", paramType: "form"}
    ]
  });

  userDocs.get('/permission/{permissionId}', {
    notes: "根据权限ID获取权限信息",
    nickname: "getPermission",
    summary: "权限信息",
    parameters: [
      {name: 'permissionId', description: "权限ID", required:true, dataType: "string", paramType: "path"}
    ]
  });

  userDocs.put('/user/{permissionId}', {
    notes: "根据权限ID编辑权限信息",
    nickname: "putPermission",
    summary: "权限信息",
    parameters: [
      {name: 'permissionId', description: "权限ID", required:true, dataType: "string", paramType: "path"},
      {name: 'name', description: "权限代码", required:false, dataType: "string", paramType: "form"},
      {name: 'description', description: "权限描述", required:false, dataType: "string", paramType: "form"}
    ]
  });

  userDocs.get('/user/{userId}/permissions', {
    notes: "获取用户所有权限信息",
    nickname: "getUserPermissions",
    summary: "用户权限",
    parameters: [
      {name: 'userId', description: "用户ID", required:true, dataType: "string", paramType: "path"}
    ]
  });

  userDocs.get('/user/{userId}/groups', {
    notes: "获取用户所有群组信息",
    nickname: "getUserGroups",
    summary: "用户群组",
    parameters: [
      {name: 'userId', description: "用户ID", required:true, dataType: "string", paramType: "path"}
    ]
  });

  userDocs.get('/group/{groupId}/permissions', {
    notes: "获取用户所有群组信息",
    nickname: "getGroupPermissions",
    summary: "群组权限",
    parameters: [
      {name: 'groupId', description: "群组ID", required:true, dataType: "string", paramType: "path"}
    ]
  });
}
