"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const config = () => ({
  port: process.env.PORT || 8080,
  database: {
    uri: process.env.NODE_ENV === 'test' ? process.env.APP_DATABASE_URL_TEST : process.env.APP_DATABASE_URL,
    options: {}
  },
  imageCloud: {
    cloud_name: process.env.APP_CLOUD_NAME,
    api_key: process.env.APP_API_KEY,
    api_secret: process.env.APP_API_SECRET
  },
  Token: {
    secret: process.env.TOKEN_SECRET
  }
});
var _default = exports.default = config;