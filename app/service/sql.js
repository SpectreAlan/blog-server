'use strict';

const Service = require('egg').Service;

class SqlService extends Service {
  async insert({ table, param }) {
    const { app, ctx, logger } = this;
    try {
      const result = await app.mysql.insert(table, param || ctx.request.body);
      return result.affectedRows;
    } catch (error) {
      ctx.throw(400, error.sqlMessage);
      logger.error('insert fail', error);
    }
  }
  async delete({ table }) {
    const { app, ctx, logger } = this;
    try {
      const result = await app.mysql.delete(table, ctx.request.body);
      return result.affectedRows;
    } catch (error) {
      ctx.throw(400, error.sqlMessage);
      logger.error('delete fail', error);
    }
  }
  async update({ table, param }) {
    const { app, ctx, logger } = this;
    try {
      const result = await app.mysql.update(table, param || ctx.request.body);
      return result.affectedRows;
    } catch (error) {
      ctx.throw(400, error.sqlMessage);
      logger.error('update fail', error);
    }
  }

  async select({ table, columns, where, orders }) {
    const { app, ctx, logger } = this;
    const limit = Number(ctx.request.body.limit) || 10;
    const page = Number(ctx.request.body.page) || 1;
    const offset = (page * limit) - limit;
    where = where || ctx.request.body;
    for (const i in where) {
      if (!where[i]) {
        delete where[i];
      }
    }
    delete where.page;
    delete where.limit;
    const param = {
      columns,
      where,
      offset,
      limit,
    };
    orders && (param.orders = [ orders ]);
    try {
      const result = await app.mysql.select(table, param);
      return result;
    } catch (error) {
      ctx.throw(400, error.sqlMessage);
      logger.error('query fail', error);
    }
  }
  async selectCount(table) {
    const param = { ...this.ctx.request.body };
    let str = '';
    for (const i in param) {
      if (param[i] && i !== 'page' && i !== 'limit') {
        str += (str ? ' and ' : '') + `${i} = '${param[i]}'`;
      }
    }
    const query = await this.app.mysql.query(`select count(id) from ${table} ${str ? ('where ' + str) : ''}`);
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
