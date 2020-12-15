'use strict';

const Service = require('egg').Service;
const axios = require('axios');
const OSS = require('ali-oss');

const oss = new OSS({
  region: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
});


class AliyunService extends Service {
  async upload(type, file, title) {
    const { ctx, config } = this;
    if (!config.imageType.includes(type)) {
      ctx.throw(400, '格式有误，仅支持png、jpg、jpeg、gif格式的图片');
    }
    const result = await oss.put(title, file.filepath);
    return result.url;
  }
  async delete(url) {
    const { config } = this;
    const baseUrl = config.github.reqBaseUrl + url.split('master/')[1];
    const sha = await axios.get(baseUrl);
    const res = await axios(
      {
        method: 'delete',
        url: baseUrl,
        data: JSON.stringify({ message: 'delete image', sha: sha.data.sha }),
        headers: { 'Content-Type': 'application/json', Authorization: 'token ' + config.github.token },
      });
    return res.status === 200;
  }
}

module.exports = AliyunService;
