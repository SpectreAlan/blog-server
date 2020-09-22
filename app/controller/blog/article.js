'use strict';

const Controller = require('../base_controller');

class ArticleController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('article');
    const list = await service.sql.select({ table: 'article', columns: [ 'id', 'article_title', 'category_name', 'create_time', 'update_time', 'tag_name', 'readed', 'cover', 'status' ] });
    this.success({ result: { total, list } });
  }
  async add() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = await service.tools.time();
    const result = service.sql.insert({ table: 'article', param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = await service.tools.time();
    const result = await service.sql.update({ table: 'article', param });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'article' });
    this.success({ result, type: '删除' });
  }
}

module.exports = ArticleController;
