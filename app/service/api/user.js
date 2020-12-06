'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  permission(menus, permission) {
    const api = []; // 用户有权访问的接口
    const roles = []; // 用户有权访问的菜单id
    let permissions = []; // 用户有权访问的菜单id
    menus.sort((a, b) => b.menu_type - a.menu_type);
    // eslint-disable-next-line array-callback-return
    menus.map(item => {
      if (permission.includes(String(item.id))) {
        api.push(item.permission);
        permissions.push(item.parentId || item.id);
      }
    });
    this.ctx.session.permission = api;
    permissions = Array.from(new Set(permissions));
    // eslint-disable-next-line array-callback-return
    permissions.map(id => { // 封装前台所需菜单信息
      const targetRoute = menus.filter(item => id === item.id)[0];
      roles.push({
        title: targetRoute.menu_name,
        key: targetRoute.menu_key,
        icon: targetRoute.icon,
        sort: targetRoute.menu_order,
        parentId: targetRoute.parentId,
        type: targetRoute.menu_type,
        id: targetRoute.id,
      });
    });
    return roles;
  }
}

module.exports = UserService;
