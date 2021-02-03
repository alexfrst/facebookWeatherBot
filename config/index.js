'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = {
    FB: {
      PageAccessToken: process.env.PageAccessToken,
      VerifyToken: process.env.VerifyToken
    }
  }
} else {
  module.exports = require('./development.json');
}