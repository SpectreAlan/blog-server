'use strict';

exports.schedule = {
  type: 'all',
  cron: '3 3 3 * * *',
};

exports.task = async function(ctx) {
  const { service } = ctx;
  const url = await service.schedule.bing();
  const buffer = await service.schedule.buffer(url);
  service.schedule.upload(buffer);
};
