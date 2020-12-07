'use strict';

const Controller = require('./base_controller');

class UserController extends Controller {
  async login() {
    const { ctx, service, app } = this;
    const { username, password } = ctx.request.body;
    const validator = await app.validator.validate({ username: 'username', password: 'password', captcha: 'captcha' }, ctx.request.body);
    if (validator) {
      this.error('参数错误', validator);
      return;
    }
    // if (ctx.request.body.captcha.toLocaleLowerCase() !== ctx.session.captcha) {
    //   this.error('验证码错误');
    //   return;
    // }
    const param = { table: 'users', columns: [ 'id', 'account', 'nick_name', 'role_id', 'avatar', 'theme' ], where: { account: username, user_pwd: password, status: 1 } };
    const query = await service.sql.select(param);
    const result = query[0];
    if (result) {
      ctx.session.role = result.role_id;
      ctx.session.username = ctx.request.body.username;
      ctx.session.captcha = '';
      this.success({ result });
    } else {
      this.error('用户名/密码错误');
    }
  }
  async userInfo() {
    const { service, ctx } = this;
    const param = { table: 'roles', columns: [ 'role_keys' ], where: { id: ctx.session.role } };
    const roles = await service.sql.select(param);
    const permission = roles[0].role_keys.split(',');
    const menu = await service.sql.selectAll({ table: 'menu' });
    const result = await service.api.user.permission(menu, permission);
    this.success({ result });
  }
  async logout() {
    this.ctx.session = null;
    this.success({ type: '注销', result: 1 });
  }
  async captcha() {
    const { ctx, service } = this;
    const captcha = await service.tools.captcha();
    ctx.response.type = 'image/svg+xml';
    this.success({ result: captcha.data });
  }
}

module.exports = UserController;
