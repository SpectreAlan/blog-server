'use strict';

const Controller = require('../base_controller');

class BasicController extends Controller {
  async search() {
    const { service } = this;
    const result = await service.sql.selectAll({ table: 'settings' });
    this.success({ result });
  }
  async add() {
    const { service } = this;
    const result = service.sql.insert({ table: 'settings' });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service } = this;
    const result = await service.sql.update({ table: 'settings' });
    this.success({ result, type: '编辑' });
  }
}

module.exports = BasicController;
