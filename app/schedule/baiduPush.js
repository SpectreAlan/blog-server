'use strict';

exports.schedule = {
  type: 'all',
  cron: '1 2 3 * * *',
};

exports.task = async function(ctx) {
  const { service } = ctx;
  service.schedule.baiduPush();
};
