'use strict';

exports.schedule = {
  type: 'all',
  cron: '3 3 3 * * *',
};

exports.task = async function(ctx) {
  ctx.service.schedule.poem();
};
