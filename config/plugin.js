'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
};
