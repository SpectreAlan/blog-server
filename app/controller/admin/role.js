'use strict';

const Controller = require('../base_controller');

class RoleController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('roles');
    const list = await service.sql.select({ table: 'roles' });
    this.success({ result: { total, list } });
  }
  async add() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = service.sql.insert({ table: 'roles', param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = await service.sql.update({ table: 'roles', param });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'roles' });
    this.success({ result, type: '删除' });
  }
}

module.exports = RoleController;

