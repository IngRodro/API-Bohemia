"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _restaurant = require("./restaurant.controller");
var _Authentication = require("../../../Utils/Authentication");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
router.get('/byUser', _Authentication.TokenValidation, _restaurant.getRestaurantByUser);
router.get('/', _restaurant.getRestaurantByLocation);
router.post('/', _Authentication.TokenValidation, (0, _expressFileupload.default)({
  useTempFiles: true,
  tempFileDir: './uploads'
}), _restaurant.createRestaurant);
router.put('/:idRestaurant', _Authentication.TokenValidation, (0, _expressFileupload.default)({
  useTempFiles: true,
  tempFileDir: './uploads'
}), _restaurant.updateRestaurant);
router.delete('/:idRestaurant', _Authentication.TokenValidation, _restaurant.deleteRestaurant);
var _default = router;
exports.default = _default;