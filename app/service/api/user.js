'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  permission(menus, permission) {
    const keys = {};
    const titles = {};
    const api = [];
    const roles = [];
    let pids = [];
    menus.sort((a, b) => b.menu_type - a.menu_type);
    menus.map(item => {
      if (item.menu_key) {
        keys[item.id] = item.menu_key;
        titles[item.id] = item.menu_name;
      } else {
        if (permission.includes(String(item.id))) {
          api.push(item.permission);
          pids.push(item.parentId);
        }
      }
    });
    this.ctx.session.permission = api;
    pids = Array.from(new Set(pids));
    pids.map(id => {
      roles.push({
        title: titles[id],
        key: keys[id],
      });
    });
    return roles;
  }
}

module.exports = UserService;
