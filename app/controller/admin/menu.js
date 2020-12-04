'use strict';

const Controller = require('../base_controller');

class MenuController extends Controller {
  async search() {
    const { service } = this;
    const result = await service.sql.selectAll({ table: 'menu' });
    this.success({ result });
  }
  async add() {
    const { service } = this;
    const result = service.sql.insert({ table: 'menu' });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service } = this;
    const result = await service.sql.update({ table: 'menu' });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'menu' });
    this.success({ result, type: '删除' });
  }
}

module.exports = MenuController;

