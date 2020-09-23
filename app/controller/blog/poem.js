'use strict';

const Controller = require('../base_controller');

class PoemController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('poem');
    const list = await service.sql.select({ table: 'poem', columns: [ 'id', 'poem', 'create_time', 'author', 'type_name' ], orders: [ 'create_time', 'desc' ] });
    this.success({ result: { total, list } });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'poem' });
    this.success({ result, type: '删除' });
  }
}

module.exports = PoemController;
