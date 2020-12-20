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
  time(format = 'yyyy-MM-dd hh:mm:ss', t) {
    const time = t ? new Date(t) : new Date();
    const o = {
      'M+': time.getMonth() + 1,
      'd+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds(),
      'q+': Math.floor((time.getMonth() + 3) / 3),
      S: time.getMilliseconds(),
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(
          RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }

    return format;
  }
  cover() {
    const i = parseInt(Math.random() * 31);
    return 'image-base-url/blog/cover/' + i + '.jpg';
  }
  async imageStorage() {
    // 查询图床
    const sql = "select setting_content from settings where setting_key = 'imageStorage'";
    const imageStorage = await this.app.mysql.query(sql);
    return imageStorage[0].setting_content;
  }
}

module.exports = ToolsService;
