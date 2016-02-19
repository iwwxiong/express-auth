'use strict';
/*
 * Created by wwxiong on 2016/01/25.
 */
var express = require('express');
var router = express.Router();
var User = require('./controllers');

/* 用户路由 */
router.get('/users', User.getUsers);
router.post('/users', User.postUser);
router.get('/user/:userId', User.getUser);
//router.delete('/user/:userId', User.deleteUser);
/* 群组路由 */
router.get('/groups', User.getGroups);
router.post('/groups', User.postGroup);
router.get('/group/:groupId', User.getGroupById);
router.put('/group/:groupId', User.putGroup);
//router.delete('/group/:groupId', User.deleteGroup);
/* 权限路由 */
router.get('/permissions', User.getPermissions);
router.post('/permissions', User.postPermission);
router.get('/permission/:permissionId', User.getPermissionById);
router.put('/permission/:permissionId', User.putPermission);
//router.delete('/permission/:permissionId', User.deletePermission);
/* 用户权限管理路由 */
router.get('/user/:userId/permissions', User.getUserPermissions);
//router.delete('/user/:userId/permission/:permissionId', User.deleteUserPermission);
router.get('/user/:userId/groups', User.getUserGroups);
router.get('/group/:groupId/permissions', User.getGroupPermissions);

module.exports = router;
