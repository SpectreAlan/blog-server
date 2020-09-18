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
  async time(format = 'yyyy-MM-dd hh:mm:ss', t) {
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
  async permission(menus, permission) {
    const menu = {};
    const menu_name = {};
    const api = [];
    const roles = [];
    menus.sort((a, b) => b.menu_type - a.menu_type);
    menus.map(item => {
      if (item.menu_key) {
        menu[item.id] = item.menu_key;
        menu_name[item.id] = item.menu_name;
      } else {
        if (permission.includes(String(item.id))) {
          api.push('/' + menu[item.parentId] + '/' + item.permission);
          if (item.permission === 'search') {
            const o = {};
            o.title = menu_name[item.parentId];
            o.key = menu[item.parentId];
            roles.push(o);
          }
        }
      }
    });
    this.ctx.session.api = api;
    return roles;
  }
}

module.exports = ToolsService;
