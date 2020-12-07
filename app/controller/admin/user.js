'use strict';

const Controller = require('../base_controller');

class UserController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('users');
    const list = await service.sql.select({ table: 'users', columns: [ 'id', 'account', 'avatar', 'status', 'nick_name', 'role_id', 'update_time', 'remark' ] });
    this.success({ result: { total, list } });
  }
  async roles() {
    const { service } = this;
    const result = await service.sql.selectAll({ table: 'roles', columns: [ 'id', 'role_name', 'status' ] });
    this.success({ result });
  }
  async add() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    param.theme = param.theme || '#304156';
    param.avatar = param.avatar || 'https://raw.githubusercontent.com/SpectreAlan/images/master/blog/logo.png';
    const result = service.sql.insert({ table: 'users', param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = await service.sql.update({ table: 'users', param });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'users' });
    this.success({ result, type: '删除' });
  }
}

module.exports = UserController;

