'use strict';

if (process.env.production) {
  module.exports = {
    FB: {
      PageAccessToken: process.env.PageAccessToken,
      VerifyToken: process.env.VerifyToken
    },
    TMDB : process.env.TMDB
  }
}