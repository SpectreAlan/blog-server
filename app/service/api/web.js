'use strict';

const Service = require('egg').Service;
const parser = require('ua-parser-js');
class WebService extends Service {
  async homeData(category, recent, tags, fullPages, poems) {
    const res = {};
    for (let i = 0; i < category.length; i++) {
      if (res[category[i].category_name]) {
        res[category[i].category_name] = res[category[i].category_name] + 1;
      } else {
        res[category[i].category_name] = 1;
      }
    }
    const categories = [];
    for (const i in res) {
      const o = {};
      o.title = i;
      o.count = res[i];
      categories.push(o);
    }
    const fullPage = fullPages[parseInt(Math.random() * (fullPages.length - 1))].url;
    let poem = poems[parseInt(Math.random() * (poems.length - 1))];
    poem = poem.poem + ' _by_ ' + poem.author;
    return { category: categories, recent, tags, fullPage, poem };
  }
  async statistics() {
    const { ctx, app, service } = this;
    const ip_addr = ctx.request.header['x-real-ip'];
    const update = "UPDATE settings set setting_content= IFNULL(setting_content,0)+1 WHERE setting_key = 'visitors'";
    await app.mysql.query(update);
    if (!ctx.session.ip) {
      ctx.session.ip = ip_addr;
      const device = new parser(ctx.request.header['user-agent']);
      const Browser = device.getBrowser();
      const Os = device.getOS();
      const system_name = Os.name + ' ' + Os.version;
      const create_time = service.tools.time();
      const city_name = ctx.request.body.city;
      await service.sql.insert({ table: 'statistics', param: { ip_addr, browser_name: Browser.name, system_name, create_time, city_name } });
    }
  }
  async articleList() {
    const { app, ctx } = this;
    const { category, tags, page } = ctx.request.body;
    const str_list = category ? 'category_name = ? and ' : tags ? 'FIND_IN_SET(?,tag_name) and ' : '';
    const list_sql = 'select id,cover,article_title as title,category_name as category,create_time as createTime,article_des as description from article where ' + str_list + 'status = 1 group by create_time desc limit ?,10';
    const arr = [];
    category ? arr.push(category) : tags ? arr.push(tags) : '';
    arr.push((page - 1) * 10);
    const list = await app.mysql.query(list_sql, arr);
    return list;
  }
  async articleCount() {
    const { app, ctx } = this;
    const { category, tags } = ctx.request.body;
    const str_count = category ? ' and category_name = ?;' : tags ? ' and FIND_IN_SET(?,tag_name)' : '';
    const total_sql = 'select count(id) from article where status = 1' + str_count;
    const total = await app.mysql.query(total_sql, [ category || tags || {} ]);
    return total[0]['count(id)'];
  }
  comment() {
    const { ctx, service } = this;
    const param = { ...ctx.request.body };
    param.status = 0;
    const device = new parser(ctx.request.header['user-agent']);
    const Browser = device.getBrowser();
    const Os = device.getOS();
    param.browser_name = Browser.name + ' ' + Browser.version;
    param.system_name = Os.name + ' ' + Os.version;
    param.create_time = service.tools.time();
    return param;
  }
}

module.exports = WebService;
