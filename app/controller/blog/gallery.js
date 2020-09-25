'use strict';

const Controller = require('../base_controller');

class GalleryController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('gallery');
    const list = await service.sql.select({ table: 'gallery', columns: [ 'id', 'title', 'status', 'des', 'origin_time', 'update_time', 'url', 'remark' ], orders: [ 'update_time', 'desc' ] });
    this.success({ result: { total, list } });
  }
  async add() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = service.sql.insert({ table: 'gallery', param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = await service.sql.update({ table: 'gallery', param });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const { service, ctx } = this;
    const result = await this.service.sql.delete({ table: 'gallery' });
    if (result) {
      const res = await service.github.delete(ctx.request.body.url);
      this.success({ result: res, type: '删除' });
    } else {
      this.error('删除失败');
    }
  }
}

module.exports = GalleryController;
