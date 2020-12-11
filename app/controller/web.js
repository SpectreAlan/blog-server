'use strict';

const Controller = require('./base_controller');

class WebController extends Controller {
  async search() {
    const { service, app, ctx } = this;
    const validator = await app.validator.validate({ page: { type: 'number', min: 1 } }, ctx.request.body);
    if (validator) {
      this.error('参数错误', validator);
      return;
    }
    const total = await service.api.web.articleCount();
    const list = await service.api.web.articleList();
    this.success({ result: { total, list } });
  }
  async info() {
    const { service } = this;
    const category = await service.sql.selectAll({
      table: 'article',
      columns: [ 'article_title', 'category_name' ],
    });
    const recent = await service.sql.select({
      table: 'article',
      columns: [ 'id', 'article_title', 'update_time', 'cover' ],
      orders: [ 'update_time', 'desc' ],
      where: { status: 1 },
    });
    const notice = await service.sql.select({ table: 'settings', columns: [ 'setting_content' ], where: { setting_key: 'notice' } });
    const tags = await service.sql.selectAll({
      table: 'tags',
      columns: [ 'id', 'tag_name' ],
    });
    const poems = await service.sql.selectAll({
      table: 'poem',
      columns: [ 'poem', 'author' ],
    });
    const result = await service.api.web.homeData(category, recent, tags, poems, notice[0].setting_content);
    this.success({ result });
  }
  async timeLine() {
    const { service } = this;
    const list = await service.sql.selectAll({ table: 'article', columns: [ 'id', 'cover', 'article_title', 'create_time' ] });
    const image = service.tools.cover();
    this.success({ result: { list, image } });
  }
  async gallery() {
    const { service } = this;
    const list = await service.sql.selectAll({ table: 'gallery', columns: [ 'title', 'des', 'origin_time', 'update_time', 'url' ] });
    const image = service.tools.cover();
    this.success({ result: { list, image } });
  }
  async statistics() {
    const { service, app } = this;
    await service.api.web.statistics();
    const query = await app.mysql.query('select count(id) from statistics');
    const total = query[0]['count(id)'];
    const todayQuery = await app.mysql.query('select count(id) from statistics where TO_DAYS(now())=TO_DAYS(create_time)');
    const today = todayQuery[0]['count(id)'];
    const visitors = await service.sql.select({ table: 'settings', columns: [ 'setting_content' ], where: { setting_key: 'visitors' } });
    this.success({ result: { total: Number(visitors[0].setting_content), visitors: total, today } });
  }
  async detail() {
    const { service, ctx, app } = this;
    const article_id = ctx.request.body.id;
    const detail = await service.sql.select({
      table: 'article',
      columns: [ 'id', 'content', 'tic', 'article_title', 'create_time', 'update_time', 'article_des', 'category_name', 'readed', 'keywords' ],
    });
    const result = detail[0];
    if (!result) {
      this.error('文章不存在');
      return;
    }
    result.recommend = await service.sql.select({
      table: 'article',
      columns: [ 'id', 'article_title', 'create_time', 'cover' ],
      where: { category_name: result.category_name },
    });
    result.comments = await service.sql.select({
      table: 'comment',
      columns: [ 'id', 'author', 'nick_name', 'article_name', 'comment', 'parent_id', 'parent_name', 'create_time', 'browser_name', 'system_name' ],
      where: { article_id, status: 1 },
    });
    result.cover = service.tools.cover();
    result.id = article_id;
    this.success({ result });
    app.mysql.query('UPDATE article set readed= IFNULL(readed,0)+1 WHERE id = ?', [ article_id ]);
  }
  async keywordsSearch() {
    const { app, ctx } = this;
    const result = await app.mysql.query("select article_title as title,id from article where content like '%" + ctx.request.body.keywords + "%';");
    this.success({ result });
  }
  async comment() {
    const { service } = this;
    const param = service.api.web.comment();
    const result = await service.sql.insert({ table: 'comment', param });
    this.success({ result });
  }
}

module.exports = WebController;

