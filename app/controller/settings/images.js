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
    // 删除本地数据库存储
    const result = await service.sql.delete({ table: 'images' });
    if (result) {
      // 获取图床
      const imageStorage = await service.tools.imageStorage();
      // 查询图床代理字段
      const imageBaseUrl = await service.sql.select({ table: 'settings', columns: [ 'setting_content' ], where: { setting_key: 'imageBaseUrl' } });
      // 获取图片路径
      const url = ctx.request.body.image_url.replace(imageBaseUrl[0].setting_content, '');
      // 删除图床文件
      const res = await service[imageStorage].delete(url);
      this.success({ result: res, type: '删除' });
    } else {
      this.error('删除失败');
    }
  }
}

module.exports = ImagesController;
