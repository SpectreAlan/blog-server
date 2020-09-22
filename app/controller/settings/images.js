'use strict';

const Controller = require('../base_controller');

class ImagesController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('images');
    const list = await service.sql.select({ table: 'images', columns: [ 'id', 'image_title', 'create_time', 'image_url' ], orders: [ 'create_time', 'desc' ] });
    this.success({ result: { total, list } });
  }
  async add() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.create_time = service.tools.time();
    const result = service.sql.insert({ table: 'images', param });
    this.success({ result, type: '添加' });
  }
  async delete() {
    const { service, ctx } = this;
    const result = await service.sql.delete({ table: 'images' });
    if (result) {
      const res = await service.github.delete(ctx.request.body.image_url);
      this.success({ result: res, type: '删除' });
    } else {
      this.error('删除失败');
    }

  }
}

module.exports = ImagesController;
