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
  // 用户管理
  router.post('/users/search', controller.admin.user.search);
  router.post('/users/add', controller.admin.user.add);
  router.post('/users/del', controller.admin.user.delete);
  router.post('/users/edit', controller.admin.user.edit);
  router.post('/role/search/all', controller.admin.user.roles);
  // 菜单管理
  router.post('/menu/search', controller.admin.menu.search);
  router.post('/menu/add', controller.admin.menu.add);
  router.post('/menu/del', controller.admin.menu.delete);
  router.post('/menu/edit', controller.admin.menu.edit);
  router.post('/menu/search/types', controller.admin.menu.types);
  // 角色管理
  router.post('/role/search', controller.admin.role.search);
  router.post('/role/add', controller.admin.role.add);
  router.post('/role/del', controller.admin.role.delete);
  router.post('/role/edit', controller.admin.role.edit);
  // 基础设置
  router.post('/basic/search', controller.settings.basic.search);
  router.post('/basic/add', controller.settings.basic.add);
  router.post('/basic/edit', controller.settings.basic.edit);
  // 图片管理
  router.post('/images/search', controller.settings.images.search);
  router.post('/images/add', controller.settings.images.add);
  router.post('/images/del', controller.settings.images.delete);
  router.post('/uploads/images', controller.upload.images);
  // 分类管理
  router.post('/tags/search', controller.blog.tag.search);
  // 标签管理
  router.post('/category/search', controller.blog.category.search);
  router.post('/category/add', controller.blog.category.add);
  router.post('/category/edit', controller.blog.category.edit);
  router.post('/category/del', controller.blog.category.delete);
  router.post('/category/belong', controller.blog.category.belong);
  // 博文管理
  router.post('/article/search', controller.blog.article.search);
  router.post('/article/add', controller.blog.article.add);
  router.post('/article/del', controller.blog.article.delete);
  router.post('/article/edit', controller.blog.article.edit);
  router.post('/write/search', controller.blog.article.detail);
  router.post('/category/search/all', controller.blog.article.category);
  router.post('/tags/search/all', controller.blog.article.tag);
  /**
      ---------------------------前台API--------------------------------
 */
};
