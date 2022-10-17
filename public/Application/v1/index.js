"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _Authentication = require("../../Utils/Authentication");
var _restaurant = _interopRequireDefault(require("./restaurant/restaurant.route"));
var _product = _interopRequireDefault(require("./product/product.route"));
var _menuOptions = _interopRequireDefault(require("./menuOptions/menuOptions.route"));
var _user = _interopRequireDefault(require("./user/user.route"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.use('/restaurants', _restaurant.default);
router.use('/products', _Authentication.TokenValidation, _product.default);
router.use('/menu', _Authentication.TokenValidation, _menuOptions.default);
router.use('/users', _user.default);
var _default = router;
exports.default = _default;