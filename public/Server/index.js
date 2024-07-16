"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeServer = exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _db = require("./db");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const corsOptions = {
  allowedHeaders: 'Content-Type, auth-token',
  exposedHeaders: 'auth-token'
};
const app = exports.app = (0, _express.default)();

// creating Server
const initializeServer = async routes => {
  // initialize DB
  await (0, _db.initializeDB)();
  app.use((0, _cors.default)(corsOptions));

  // json parse
  app.use(_express.default.json());

  // set urls
  app.use(routes);
};
exports.initializeServer = initializeServer;