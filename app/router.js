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
  router.get('/user/captcha', controller.user.captcha);
  router.post('/user/login', controller.user.login);
  router.post('/user/logout', controller.user.logout);
  router.post('/user/info', controller.user.userInfo);
  router.post('/user/theme', controller.admin.user.edit);
  // 报表
  router.post('/dashboard/search', controller.report.dashboard);
  router.post('/dashboard/item', controller.report.item);
  router.get('/dashboard/category', controller.report.category);
  router.get('/dashboard/city', controller.report.city);
  // 用户管理
  router.post('/users/search', controller.admin.user.search);
  router.post('/users/add', controller.admin.user.add);
  router.post('/users/del', controller.admin.user.delete);
  router.post('/users/edit', controller.admin.user.edit);
  router.post('/users/roles', controller.admin.user.roles);
  // 菜单管理
  router.post('/menu/search', controller.admin.menu.search);
  router.post('/menu/add', controller.admin.menu.add);
  router.post('/menu/del', controller.admin.menu.delete);
  router.post('/menu/edit', controller.admin.menu.edit);
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
  router.post('/tags/add', controller.blog.tag.add);
  router.post('/tags/edit', controller.blog.tag.edit);
  router.post('/tags/delete', controller.blog.tag.delete);
  router.post('/tags/belong', controller.blog.tag.belong);
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
  router.post('/article/detail', controller.blog.article.detail);
  router.post('/article/category', controller.blog.article.category);
  router.post('/article/tags', controller.blog.article.tag);
  // 评论管理
  router.post('/comment/search', controller.blog.comment.search);
  router.post('/comment/add', controller.blog.comment.add);
  router.post('/comment/del', controller.blog.comment.delete);
  router.post('/comment/edit', controller.blog.comment.edit);
  // 一言
  router.post('/poem/search', controller.blog.poem.search);
  router.post('/poem/del', controller.blog.poem.delete);
  // 相册管理
  router.post('/gallery/search', controller.blog.gallery.search);
  router.post('/gallery/del', controller.blog.gallery.delete);
  router.post('/gallery/edit', controller.blog.gallery.edit);
  router.post('/gallery/add', controller.blog.gallery.add);
  /**
      ---------------------------前台API--------------------------------
 */
  router.post('/web/list', controller.web.search);
  router.get('/web/info', controller.web.info);
  router.get('/web/timeLine', controller.web.timeLine);
  router.get('/web/gallery', controller.web.gallery);
  router.get('/web/statistics', controller.web.statistics);
  router.post('/web/detail', controller.web.detail);
  router.post('/web/keywordsSearch', controller.web.keywordsSearch);
  router.post('/web/comment', controller.web.comment);
};
