'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /**
      ---------------------------后台管理API--------------------------------
 */
  // 登录
  router.get('/', controller.home.index);
  router.get('/captcha', app.controller.login.captcha);
  router.post('/login', controller.login.login);
  router.post('/userInfo', controller.login.userInfo);
  // 报表
  router.post('/dashboard/search', controller.report.dashboard);
  router.post('/dashboard/search/item', controller.report.item);
  router.get('/dashboard/search/category', controller.report.category);
  /**
      ---------------------------前台API--------------------------------
 */
};
