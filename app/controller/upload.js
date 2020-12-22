'use strict';

const Controller = require('./base_controller');

class UploadController extends Controller {
  async images() {
    const { service, ctx } = this;
    const { storage, image_title, path } = ctx.request.body;
    const file = ctx.request.files[0];
    const type = file.mime.split('/')[1];
    const title = (path || '/blog/common/') + new Date().getTime() + '.' + type;
    const create_time = service.tools.time();
    const imageStorage = await service.tools.imageStorage(); // 获取图床
    const res = await service[imageStorage].upload(type, file, title, create_time);
    if (res) {
      const image_url = 'image-base-url' + title;
      if (!storage) {
        await service.sql.insert({ table: 'images', param: {
          image_title,
          image_url,
          create_time,
        } });
      }
      this.success({ result: image_url, type: '上传' });
    } else {
      this.error('上传失败');
    }
  }
}

module.exports = UploadController;
