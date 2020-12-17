'use strict';

const Service = require('egg').Service;
const axios = require('axios');
const fs = require('fs');

class GithubService extends Service {
  async upload(type, file, title, create_time) {
    const { ctx, config } = this;
    if (!config.imageType.includes(type)) {
      ctx.throw(400, '格式有误，仅支持png、jpg、jpeg、gif格式的图片');
    }
    // 获取文件
    let content = fs.readFileSync(file.filepath);
    // 文件转base64
    content = Buffer.from(content).toString('base64');
    const res = await axios({
      headers: {
        Authorization: 'token ' + config.github.token,
      },
      method: 'put',
      url: config.github.reqBaseUrl + title,
      data: JSON.stringify({
        message: 'add image ' + create_time,
        content,
      }),
    });
    return res.data.content.sha;
  }
  async delete(url) {
    const { config } = this;
    url = config.github.reqBaseUrl + url;
    let sha = null;
    try {
      sha = await axios.get(url);
    } catch (e) {
      return true;
    }
    const res = await axios(
      {
        method: 'delete',
        url,
        data: JSON.stringify({ message: 'delete image', sha: sha.data.sha }),
        headers: { 'Content-Type': 'application/json', Authorization: 'token ' + config.github.token },
      });
    return res.status === 200;
  }
}

module.exports = GithubService;
