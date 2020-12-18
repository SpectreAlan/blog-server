'use strict';

const Controller = require('./base_controller');

class ReportController extends Controller {
  async dashboard() {
    const { service } = this;
    const images = await service.sql.selectCount('images');
    const article = await service.sql.selectCount('article');
    const comment = await service.sql.selectCount('comment');
    const statistics = await service.sql.selectCount('statistics');
    const visitors = await service.sql.select({ table: 'settings', columns: [ 'setting_content' ], where: { setting_key: 'visitors' } });
    this.success({ result: {
      images,
      article,
      comment,
      statistics,
      visitors: Number(visitors[0].setting_content),
    } });
  }
  async item() {
    const { ctx, app } = this;
    const key = ctx.request.body.key;
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    const arr = [];
    for (let i = 0; i < 6; i++) {
      const l = 'select count(id) from ' + key + ' where date(create_time) between ';
      const str = `'${year}-${month}-01' and '${year}-${month}-31'`;
      const data = await app.mysql.query(l + str);
      arr.push(data[0]['count(id)']);
      --month;
      if (month < 1) {
        month = 12;
        --year;
      }
    }
    this.success({ result: arr.reverse() });
  }
  async category() {
    const { service } = this;
    const list = await service.sql.selectAll({ table: 'statistics', columns: [ 'browser_name', 'city_name' ] });
    const result = await service.api.report.item(list);
    this.success({ result });
  }
  async city() {
    const { service } = this;
    const result = await service.sql.selectAll({ table: 'city', columns: [ 'city_name', 'x', 'y', 'n' ] });
    this.success({ result });
  }
}

module.exports = ReportController;

