'use strict';

const Service = require('egg').Service;

class SqlService extends Service {
  async insert({ table, param }) {
    const result = await this.app.mysql.insert(table, param);
    return result.affectedRows;
  }
  async delete(table) {
    const { app, ctx } = this;
    const result = await app.mysql.delete(table, ctx.request.body);
    return result.affectedRows;
  }
  async update({ table, param }) {
    const result = await this.app.mysql.update(table, param);
    return result.affectedRows;
  }
  async select({ table, columns, where, orders }) {
    const { app, ctx } = this;
    const limit = Number(ctx.request.body.limit) || 10;
    const page = Number(ctx.request.body.page) || 1;
    const offset = (page * limit) - limit;
    if (where) {
      delete where.page;
      delete where.limit;
    }
    const param = {
      columns,
      where,
      offset,
      limit,
    };
    orders && (param.orders = [ orders ]);
    const result = await app.mysql.select(table, param);
    return result;
  }
  async selectCount(table) {
    const query = await this.app.mysql.query(`select count(id) from ${table}`);
    return query[0]['count(id)'];
  }
  async selectAll({ table, columns }) {
    const query = await this.app.mysql.select(table, {
      columns,
    });
    return query;
  }
}

module.exports = SqlService;
