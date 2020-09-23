'use strict';

const Controller = require('../base_controller');

class FullpageController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('fullPage');
    const list = await service.sql.select({ table: 'fullPage', columns: [ 'id', 'url', 'create_time' ], orders: [ 'create_time', 'desc' ] });
    this.success({ result: { total, list } });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'fullPage' });
    this.success({ result, type: '删除' });
  }
}

module.exports = FullpageController;
