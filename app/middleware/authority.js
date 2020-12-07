'use strict';

const whiteList = [ '/user/login', '/user/info', '/user/logout', '/user/captcha', '/user/theme' ];

module.exports = () => {
  return async function auth(ctx, next) {
    const url = ctx.originalUrl;
    const web = /^\/web\//;
    if (whiteList.includes(url) || web.test(url)) {
      await next();
    } else {
      if (ctx.session.username) {
        if (ctx.session.permission.includes(url)) {
          await next();
        } else {
          ctx.body = { code: 0, msg: '暂无权限执行此操作', data: null };
        }
      } else {
        ctx.throw(401, '您需要先登陆以后才能操作');
      }
    }
  };
};
