'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = this.service.tools.time();
  }
}

module.exports = HomeController;
