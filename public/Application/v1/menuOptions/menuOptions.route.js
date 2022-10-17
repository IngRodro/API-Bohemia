"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _menuOptions = require("./menuOptions.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/:idRestaurant', _menuOptions.getMenu);
router.post('/', _menuOptions.createMenu);
router.put('/:idMenu', _menuOptions.updateMenu);
router.delete('/:idMenu', _menuOptions.deleteMenu);
var _default = router;
exports.default = _default;