'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const query = await app.mysql.select('users', {
      columns: [ 'account', 'nick_name', 'role_id', 'avatar' ],
      where: { account: username, user_pwd: password, status: 1 },
    });
    return query[0];
  }
  async permission() {
    const { ctx, app } = this;
    const query = await app.mysql.select('roles', {
      columns: [ 'role_keys' ],
      where: { id: ctx.session.role },
    });
    return query[0].role_keys.split(',');
  }
  async menus() {
    const { app } = this;
    const query = await app.mysql.select('menu');
    return query;
  }
}

module.exports = LoginService;
