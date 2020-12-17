/* eslint valid-jsdoc: "off" */

'use strict';
const process = require('process');
const path = require('path');
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
  const userConfig = {
    myAppName: 'blog',
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
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
  config.multipart = {
    mode: 'file',
  };
  config.imageType = [ 'png', 'jpg', 'jpeg', 'gif' ];
  config.github = {
    reqBaseUrl: 'http://api.github.com/repos/SpectreAlan/images/contents',
    imgBaseUrl: 'https://raw.githubusercontent.com/SpectreAlan/images/master/',
    token: '',
  };
  config.aliyun = {
    region: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '',
  };
  config.bing = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
  config.hitokoto = 'https://v1.hitokoto.cn';
  config.baiduPush = 'http://data.zz.baidu.com/urls?site=https://jszoo.com&token=Vzm6yLROGTuW529Q';
  config.rundir = process.cwd() + '/run';// 配置执行时临时文件的路径
  config.logger = {
    dir: path.join(process.cwd(), 'logs'), // 配置普通日志文件地址
  };
  config.customLogger = {
    scheduleLogger: {
      file: path.join(process.cwd(), 'logs', 'egg-schedule.log'), // 配置定时任务日志的地址
    },
  };
  config.static = {
    dir: process.cwd() + '/public',
  };
  return {
    ...config,
    ...userConfig,
  };
};
