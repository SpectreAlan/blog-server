'use strict';

exports.schedule = {
  type: 'all',
  cron: '3 3 3 * * *',
};

exports.task = async function(ctx) {
  // fullPage
  const { service } = ctx;
  const url = await service.schedule.bing(); // 获取bing图片地址
  const name = '/blog/cover/' + new Date().getDate() + '.jpg'; // 获取当日图片路径
  const imageStorage = await service.tools.imageStorage(); // 获取当图床类型
  await service.schedule[imageStorage](name, url); // 调用图床上传
  // baidu push
  await service.schedule.baiduPush();
  // 一言
  await service.schedule.poem();
};
