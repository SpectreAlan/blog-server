'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class ToolsService extends Service {
  async captcha() { // 验证码
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      ignoreChars: '0o1i',
      color: true,
    });
    this.ctx.session.captcha = captcha.text.toLocaleLowerCase();
    return captcha;
  }
  async validator(rules) { // 入参校验
    const { ctx, app } = this;
    const errors = await app.validator.validate(rules, ctx.request.body);
    if (errors) {
      ctx.body = {
        code: 0,
        msg: errors,
      };
    }
  }
}

module.exports = ToolsService;
