'use strict';

const Controller = require('../base_controller');

class TagController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('tags');
    const list = await service.sql.select({ table: 'tags', columns: [ 'id', 'tag_name', 'update_time' ], orders: [ 'update_time', 'desc' ] });
    this.success({ result: { total, list } });
  }
  async add() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = service.sql.insert({ table: 'tags', param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = await service.sql.update({ table: 'tags', param });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'tags' });
    this.success({ result, type: '删除' });
  }
  async belong() {
    const { app, ctx } = this;
    const result = await app.mysql.query(
      'select article_title,category_name,update_time,tag_name,status  from article where FIND_IN_SET(?,tag_name)',
      [ ctx.request.body.tag_name ]
    );
    this.success({ result });
  }
}

module.exports = TagController;
