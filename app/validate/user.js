'use strict';
module.exports = app => {

  const { validator } = app;
  validator.addRule('username', (rule, value) => {
    if (!value.match(/^[a-zA-Z][\.@a-zA-Z0-9_-]{3,11}/)) {
      return '用户名格式错误';
    }
  });
  validator.addRule('password', (rule, value) => {
    if (!value.match(/[0-9a-zA-Z]{32}$/)) {
      return '密码格式错误';
    }
  });
  validator.addRule('captcha', (rule, value) => {
    if (!value.match(/[0-9a-zA-Z]{4}/)) {
      return '验证码格式错误';
    }
  });
};
