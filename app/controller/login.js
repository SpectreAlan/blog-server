'use strict';

const Controller = require('./base_controller');

class LoginController extends Controller {
  async login() {
    const { ctx, service, app } = this;
    const validator = await app.validator.validate({ username: 'username', password: 'password', captcha: 'captcha' }, ctx.request.body);
    if (validator) {
      this.error('参数错误', validator);
      return;
    }
    // if (ctx.request.body.captcha.toLocaleLowerCase() !== ctx.session.captcha) {
    //   this.error('验证码错误');
    //   return;
    // }
    const result = await service.database.login.login();
    if (result) {
      ctx.session.role = result.role_id;
      ctx.session.username = ctx.request.body.username;
      ctx.session.captcha = '';
      this.success(result);
    } else {
      this.error('用户名/密码错误');
    }
  }
  async userInfo() {
    const { service } = this;
    const permission = await service.database.login.permission();
    const menu = await service.database.login.menus();
    const result = await service.api.login.permission(menu, permission);
    if (result) {
      this.success(result);
    } else {
      this.error('角色获取失败，请联系管理员');
    }
  }
  async captcha() {
    const { ctx, service } = this;
    const captcha = await service.tools.captcha();
    ctx.response.type = 'image/svg+xml';
    ctx.body = { data: captcha.data, code: 1 };
  }
}

module.exports = LoginController;
