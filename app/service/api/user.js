'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  permission(menus, permission) {
    const api = [];
    const roles = [];
    let pids = [];
    menus.sort((a, b) => b.menu_type - a.menu_type);
    menus.map(item => {
      if (permission.includes(String(item.id))) {
        api.push(item.permission);
        pids.push(item.parentId || item.id);
      }
    });
    this.ctx.session.permission = api;
    pids = Array.from(new Set(pids));
    pids.map(id => {
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
