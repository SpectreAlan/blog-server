'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  success(data, msg) {
    this.ctx.body = {
      msg,
      code: 1,
      data,
    };
  }
  error(msg, data) {
    this.ctx.body = {
      msg: msg || 'error',
      code: 0,
      data,
    };
  }
  notFound(msg) {
    this.ctx.throw(404, msg || 'not found');
  }
}

module.exports = BaseController;
