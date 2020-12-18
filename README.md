<div align="center">
<h1 align="center">个人博客中台service</h1>
<img src="https://img.shields.io/github/issues/SpectreAlan/blog-server?color=green">
<img src="https://img.shields.io/github/stars/SpectreAlan/blog-server?color=yellow">
<img src="https://img.shields.io/github/forks/SpectreAlan/blog-server?color=orange">
<img src="https://img.shields.io/github/license/SpectreAlan/blog-server?color=ff69b4">
<img src="https://img.shields.io/github/search/SpectreAlan/blog-server/main?color=blue">
<img src="https://img.shields.io/github/v/release/SpectreAlan/blog-server?color=blueviolet">
<img src="https://img.shields.io/github/languages/code-size/SpectreAlan/blog-server?color=critical">
</div>

# 简介
项目基于eggjs搭建，提供博客前台和博客后台管理系统的API数据接口，搭配 [博客前台](https://github.com/SpectreAlan/blog-nextjs) 以及 [后台管理](https://github.com/SpectreAlan/blog_admin) 一起组成完整的个人博客系统

# 功能

* [x] 提供博客前台、后台管理API数据接口
* [x] 集成GitHub图床、阿里云oss图床
* [x] 自动获取bing高清壁纸存储至图床
* [x] 自动获取一言存储到数据库
* [x] 自动推送文章链接至百度收录
* [x] 动态切换图床服务
* [x] 访客统计: 设备、ip、归属地

# 目录

- [简介](#简介)
- [功能](#功能)
- [目录](#目录)
- [使用方法](#使用方法)
  - [1.fork本项目](#1.fork本项目)
  - [2.本地运行](#2.本地运行)
  - [3.参数配置](#3.参数配置)
  - [4.部署及后续操作](#4.部署及后续操作)
- [配置文件说明](#配置文件说明)
# 使用方法

## 1.fork本项目

项目地址：[SpectreAlan/blog-server](https://github.com/SpectreAlan/blog-server)

## 2.本地运行
```bash
# 克隆项目
git clone https://github.com/SpectreAlan/blog-server.git
# 切换到项目目录
cd blog-server
# 安装依赖
yarn install
# 启动服务
yarn run dev
```
## 3.参数配置
找到 /config/config.default.js 文件
### 1.阿里云oss
- 登录阿里云账号，创建一个Bucket
- 创建一个Access Key
- 将已创建的Access Key配置到 config.aliyun
### 2.github
- 创建一个公共仓库作为图床仓库
- 创建一个Personal access tokens填入config.github对应的tokens字段

登录github，右上角找到settings，点击左侧Developer settings，然后点击左侧Personal access tokens，接下俩点击右侧New personal access token
<img src="https://raw.githubusercontent.com/SpectreAlan/images/master/blog/common/access.png">
在新窗口里面，note随意填写，然后勾选如图所示的绿色小钩，然后点击最下方的创建按钮，创建成功以后复制下生成的tokens备用
<img src="https://raw.githubusercontent.com/SpectreAlan/images/master/blog/common/20201218161140.png">
### 3.百度push
找到config.baiduPush字段配置接口调用地址，登录百度站长管理平台，找到如下接口地址
<img src="https://raw.githubusercontent.com/SpectreAlan/images/master/blog/common/baidupush.png">

## 4.部署及后续操作
命令行切换到项目根目录
```bash
# 启动服务
yarn start
# 停止服务
yarn start
# 重启服务
yarn stop
```

# 配置文件说明
```javascript
module.exports = appInfo => {
  const config = exports = {};

  // 权限验证和错误处理的中间件
  config.middleware = [ 'authority', 'errorHandler' ];
  // 参数校验
  config.validate = {
    convert: true,
    widelyUndefined: true,
  };
  const userConfig = {
    myAppName: 'blog',
  };
  // 跨域访问权限
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  // 跨域访问权限
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  // mysql配置
  config.mysql = {
    client: {
      host: '127.0.0.1', // 主机地址
      port: '3306', // 端口号
      user: 'root', // 连接mysql的用户名
      password: '', // 连接mysql的密码
      database: 'blog', // 需要操作的库
    },
    app: true,
    agent: false,
  };
  // session相关配置
  config.session = {
    key: 'SESSION_ID',
    maxAge: 1000 * 60 * 30, // 过期时间
    httpOnly: true,
    encrypt: true,
    renew: true, // 自动刷新
  };
  // 文件上传配置
  config.upLoad = {
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
    },
  };
  // 文件上传配置
  config.multipart = {
    mode: 'file',
  };
  config.imageType = [ 'png', 'jpg', 'jpeg', 'gif' ];
  // github图床配置
  config.github = {
    reqBaseUrl: 'http://api.github.com/repos/用户名/仓库/contents',
    imgBaseUrl: 'https://raw.githubusercontent.com/用户名/仓库/master/',
    token: '', // Personal access tokens
  };
  // 阿里云oss配置
  config.aliyun = {
    region: '',  // 格式: oss-cn-hangzhou、oss-cn-beijing
    accessKeyId: '',
    accessKeySecret: '',
    bucket: '', // Bucket名称
  };
  // bing图片请求地址
  config.bing = 'https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
  // 一言请求地址
  config.hitokoto = 'https://v1.hitokoto.cn';
  // 百度推送api
  config.baiduPush = '';
  config.rundir = process.cwd() + '/run';// 配置执行时临时文件的路径
  config.logger = {
    dir: path.join(process.cwd(), 'logs'), // 配置普通日志文件地址
  };
  config.customLogger = {
    scheduleLogger: {
      file: path.join(process.cwd(), 'logs', 'egg-schedule.log'), // 配置定时任务日志的地址
    },
  };
  // 绑定静态目录
  config.static = {
    dir: process.cwd() + '/public',
  };
  return {
    ...config,
    ...userConfig,
  };
};

```
