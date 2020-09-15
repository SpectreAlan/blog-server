'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/captcha', app.controller.login.captcha);
  router.post('/login', controller.login.login);
  router.post('/userInfo', controller.login.userInfo);
};
