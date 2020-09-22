/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599371946507_9765';

  // add your middleware config here
  config.middleware = [ 'authority', 'errorHandler' ];
  config.validate = {
    convert: true,
    widelyUndefined: true,
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '',
      database: 'blog',
    },
    app: true,
    agent: false,
  };
  config.session = {
    key: 'SESSION_ID',
    maxAge: 1000 * 60 * 30,
    httpOnly: true,
    encrypt: true,
    renew: true,
  };
  config.upLoad = {
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  };
  config.imageType = [ 'png', 'jpg', 'jpeg', 'gif' ],
  config.github = {
    reqBaseUrl: 'https://api.github.com/repos/SpectreAlan/images/contents/',
    imgBaseUrl: 'https://raw.githubusercontent.com/SpectreAlan/images/master/',
    token: '09e2890ba9bced95e8c98fc0fedee13c03edc673',
  },
  config.bing = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1',
  config.hitokoto = 'https://v1.hitokoto.cn';
  return {
    ...config,
    ...userConfig,
  };
};
