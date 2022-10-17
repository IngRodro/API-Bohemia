"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("./user.controller");
var _Authentication = require("../../../Utils/Authentication");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/login', _user.loginUser);
router.post('/', _user.createUser);
router.put('/', _Authentication.TokenValidation, _user.updateUser);
var _default = router;
exports.default = _default;