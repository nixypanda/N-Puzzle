/* eslint-disable no-process-env */

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./utils/Index.prod');
} else {
  module.exports = require('./utils/Index.dev');
}
