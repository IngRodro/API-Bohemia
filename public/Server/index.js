"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeServer = exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _config = _interopRequireDefault(require("../config"));
var _db = require("./db");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  port
} = (0, _config.default)();
const app = (0, _express.default)();

// creating Server
exports.app = app;
const initializeServer = async routes => {
  // initialize DB
  await (0, _db.initializeDB)();
  app.use((0, _cors.default)());

  // json parse
  app.use(_express.default.json());

  // set urls
  app.use(routes);
  app.listen(port, () => {
    console.log(`This APP is listening on http://localhost:${port}`);
  });
};
exports.initializeServer = initializeServer;