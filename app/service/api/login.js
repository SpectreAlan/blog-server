'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async permission(menus, permission) {
    const menu = {};
    const menu_name = {};
    const api = [];
    const roles = [];
    menus.sort((a, b) => b.menu_type - a.menu_type);
    menus.map(item => {
      if (item.menu_key) {
        menu[item.id] = item.menu_key;
        menu_name[item.id] = item.menu_name;
      } else {
        if (permission.includes(String(item.id))) {
          api.push('/' + menu[item.parentId] + '/' + item.permission);
          if (item.permission === 'search') {
            const o = {};
            o.title = menu_name[item.parentId];
            o.key = menu[item.parentId];
            roles.push(o);
          }
        }
      }
    });
    this.ctx.session.api = api;
    return roles;
  }
}

module.exports = LoginService;
