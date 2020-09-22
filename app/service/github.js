'use strict';

const Service = require('egg').Service;
const axios = require('axios');

class GithubService extends Service {
  async upload(type, file, title, create_time) {
    const { ctx, config } = this;
    if (!config.imageType.includes(type)) {
      ctx.throw(400, '格式有误，仅支持png、jpg、jpeg、gif格式的图片');
    }
    const res = await axios.put(config.github.reqBaseUrl + 'blog/' + title + '?access_token=' + config.github.token,
      JSON.stringify({
        message: 'add image ' + create_time,
        content: file.split('base64,')[1],
      })
    );
    return res.data.content.sha;
  }
  async delete(url) {
    const { config } = this;
    const baseUrl = config.github.reqBaseUrl + url.split('master/')[1];
    const sha = await axios.get(baseUrl);
    const res = await axios(
      {
        method: 'delete',
        url: baseUrl + '?access_token=' + config.github.token,
        data: JSON.stringify({ message: 'delete image', sha: sha.data.sha }),
        headers: { 'Content-Type': 'application/json' },
      });
    return res.status === 200;
  }
}

module.exports = GithubService;
