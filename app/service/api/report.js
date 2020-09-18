'use strict';

const Service = require('egg').Service;

class ReportService extends Service {
  getSection(section) {
    if (!section) {
      return '地球';
    }
    if (section.includes('省')) {
      return section.split('省')[0] + '省';
    }
    if (section.includes('自治区')) {
      return section.split('自治区')[0] + '自治区';
    }
    if (section.includes('市')) {
      return section.split('市')[0] + '市';
    }
    return section;
  }
  async item(list) {
    const browsers = {};
    const cities = {};
    for (let i = 0; i < list.length; i++) {
      const browser_name = list[i].browser_name || '其他';
      if (browsers[browser_name]) {
        browsers[browser_name] = browsers[browser_name] + 1;
      } else {
        browsers[browser_name] = 1;
      }
      const city_name = this.getSection(list[i].city_name);
      if (cities[city_name]) {
        cities[city_name] = cities[city_name] + 1;
      } else {
        cities[city_name] = 1;
      }
    }
    const city = [];
    const browser = [];
    for (const i in browsers) {
      const o = {};
      o.name = i;
      o.value = browsers[i];
      browser.push(o);
    }
    for (const i in cities) {
      const o = {};
      o.name = i;
      o.value = cities[i];
      city.push(o);
    }
    city.sort((a, b) => b.value - a.value);
    return { browser, city };
  }
}

module.exports = ReportService;
