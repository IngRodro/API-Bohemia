"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("./user.controller");
var _Authentication = require("../../../Utils/Authentication");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.post('/login', _user.loginUser);
router.post('/', _user.createUser);
router.put('/', _Authentication.TokenValidation, _user.updateUser);
var _default = exports.default = router;