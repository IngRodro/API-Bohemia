"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = exports.App = void 0;
require("dotenv/config");
var _config2 = _interopRequireDefault(require("./config"));
var _Routes = _interopRequireDefault(require("./Routes"));
var _index = require("./Server/index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  port
} = (0, _config2.default)();
(0, _index.initializeServer)(_Routes.default);
const App = exports.App = _index.app;
// create express app
const server = exports.server = _index.app.listen(port, () => {});