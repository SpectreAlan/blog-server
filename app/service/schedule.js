'use strict';

const Service = require('egg').Service;
const axios = require('axios');

class ScheduleService extends Service {
  async bing() {
    const res = await axios.get(this.config.bing);
    return 'http://www.bing.com' + res.data.images[0].url;
  }
  async buffer(url) {
    const buffer = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    return buffer.data.toString('base64');
  }
  async upload(base64) {
    const { config, service } = this;
    const time = service.tools.time();
    const day = new Date().getDay();
    const info = await axios.get(config.github.reqBaseUrl + day + '.jpg');
    const update = await axios({
      method: 'put',
      url: config.github.reqBaseUrl + day + '.jpg?access_token=' + config.github.token,
      data: JSON.stringify({
        message: 'update image ' + time,
        sha: info.data.sha,
        content: base64,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    return update.data.content.sha ? 1 : 0;
  }
  async poem() {
    const { config, service } = this;
    const res = await axios.get(config.hitokoto);
    const { hitokoto, type, from } = res.data;
    const result = await service.sql.insert({ table: 'poem', param: {
      poem: hitokoto,
      create_time: service.tools.time(),
      author: from,
      type_name: type,
    } });
    return result;
  }
}

module.exports = ScheduleService;
