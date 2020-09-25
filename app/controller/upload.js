'use strict';

const Controller = require('./base_controller');

class UploadController extends Controller {
  async images() {
    const { service, ctx, config } = this;
    const { storage, image_title, file } = ctx.request.body;
    const type = file.match(/image\/(\S*);/)[1];
    const title = new Date().getTime() + '.' + type;
    const create_time = service.tools.time();
    const upload = await service.github.upload(type, file, title, create_time);
    if (upload) {
      const image_url = config.github.imgBaseUrl + 'blog/' + title;
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
