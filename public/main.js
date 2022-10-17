"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _routes = _interopRequireDefault(require("./routes"));
var _Server = require("./Server");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const startServer = (0, _Server.initializeServer)(_routes.default);
var _default = startServer;
exports.default = _default;