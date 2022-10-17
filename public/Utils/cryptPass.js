"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptPass = exports.comparePass = void 0;
var _bcrypt = _interopRequireDefault(require("bcrypt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const encryptPass = async password => {
  const salt = await _bcrypt.default.genSalt(10);
  const hash = await _bcrypt.default.hash(password, salt);
  return hash;
};
exports.encryptPass = encryptPass;
const comparePass = async (password, hash) => {
  const result = await _bcrypt.default.compare(password, hash);
  return result;
};
exports.comparePass = comparePass;