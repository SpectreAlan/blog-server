'use strict';

exports.schedule = {
  type: 'all',
  cron: '3 3 3 * * *',
};

exports.task = async function(ctx) {
  // fullPage
  const { service } = ctx;
  const url = await service.schedule.bing();
  const buffer = await service.schedule.buffer(url);
  await service.schedule.upload(buffer);
  // baidu push
  await service.schedule.baiduPush();
  // 一言
  await service.schedule.poem();
};
