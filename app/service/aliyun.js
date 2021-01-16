'use strict';

const Service = require('egg').Service;
const OSS = require('ali-oss');


class AliyunService extends Service {
  async upload(type, file, title) {
    const { ctx, config } = this;
    if (!config.imageType.includes(type)) {
      ctx.throw(400, '格式有误, 仅支持png、jpg、jpeg、gif格式的图片');
    }
    const oss = new OSS(config.aliyun);
    const result = await oss.put(title, file.filepath);
    return result.url;
  }
  async delete(url) {
    const { config } = this;
    const oss = new OSS(config.aliyun);
    const result = await oss.delete(url);
    return result.res.status === 204;
  }
}

module.exports = AliyunService;
