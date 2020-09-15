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
  return {
    ...config,
    ...userConfig,
  };
};
