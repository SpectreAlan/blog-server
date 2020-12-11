'use strict';

const Controller = require('../base_controller');

class ArticleController extends Controller {
  async search() {
    const { service, ctx } = this;
    const total = await service.sql.selectCount('article');
    const { article_title } = ctx.request.body;
    const list = await service.sql.select({
      table: 'article',
      columns: [ 'id', 'article_title', 'category_name', 'create_time', 'update_time', 'tag_name', 'readed', 'cover', 'status' ],
      where: { article_title },
      orders: [ 'create_time', 'desc' ],
    });
    this.success({ result: { total, list } });
  }
  async detail() {
    const { service } = this;
    let result = await service.sql.select({ table: 'article', columns: [ 'id', 'tic', 'keywords', 'article_title', 'category_name', 'article_des', 'update_time', 'tag_name', 'content', 'cover', 'status' ] });
    result = result[0];
    result.tag_name = result.tag_name.split(',');
    this.success({ result });
  }
  async tag() {
    const { service } = this;
    const result = await service.sql.selectAll({ table: 'tags', columns: [ 'id', 'tag_name' ] });
    this.success({ result });
  }
  async category() {
    const { service } = this;
    const result = await service.sql.selectAll({ table: 'category', columns: [ 'id', 'category_name' ] });
    this.success({ result });
  }
  async add() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    const time = service.tools.time();
    param.update_time = time;
    param.create_time = time;
    const result = service.sql.insert({ table: 'article', param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = await service.sql.update({ table: 'article', param });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'article' });
    this.success({ result, type: '删除' });
  }
}

module.exports = ArticleController;
