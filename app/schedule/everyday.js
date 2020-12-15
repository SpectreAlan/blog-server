'use strict';

exports.schedule = {
  type: 'all',
  cron: '3 3 3 * * *',
};

exports.task = async function(ctx) {
  // fullPage
  const { service, app } = ctx;
  const url = await service.schedule.bing();
  const name = new Date().getDate() + '.jpg';
  await service.github.delete(app.config.github.imgBaseUrl + 'blog/cover/' + name);
  const buffer = await service.schedule.buffer(url);
  await service.schedule.upload(buffer, name);
  // baidu push
  await service.schedule.baiduPush();
  // 一言
  await service.schedule.poem();
};
