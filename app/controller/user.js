'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = {
      name: `hello ${ctx.params.userName}`,
    };
  }
}

module.exports = UserController;
