"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _menuOptions = require("./menuOptions.controller");
var _Authentication = require("../../../Utils/Authentication");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get('/show/:idRestaurant', _menuOptions.getMenu);
router.get('/:idRestaurant', _Authentication.TokenValidation, _menuOptions.getMenu);
router.post('/', _Authentication.TokenValidation, _menuOptions.createMenu);
router.put('/:idMenu', _Authentication.TokenValidation, _menuOptions.updateMenu);
router.delete('/:idMenu', _Authentication.TokenValidation, _menuOptions.deleteMenu);
var _default = exports.default = router;