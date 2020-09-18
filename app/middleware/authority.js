'use strict';

const whiteList = [ '/login', '/userInfo', '/logout', '/captcha' ];

module.exports = () => {
  return async function auth(ctx, next) {
    await next();
    // const url = ctx.originalUrl;
    // if (whiteList.includes(url) || url.includes('/web/')) {
    //   await next();
    // } else {
    //   if (ctx.session.username) {
    //     if (ctx.session.api.includes(url) || url.split('/').length === 4) {
    //       await next();
    //     } else {
    //       ctx.body = { code: 0, msg: '请联系管理员授权', data: null };
    //     }
    //   } else {
    //     ctx.throw(401, '您需要先登陆以后才能操作');
    //   }
    // }
  };
};
