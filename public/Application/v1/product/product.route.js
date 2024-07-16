"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _product = require("./product.controller");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = _express.default.Router();
router.get('/', _product.getAllProduct);
router.post('/', (0, _expressFileupload.default)({
  useTempFiles: true,
  tempFileDir: './uploads'
}), _product.createProduct);
router.put('/:idProduct', (0, _expressFileupload.default)({
  useTempFiles: true,
  tempFileDir: './uploads'
}), _product.updateProduct);
router.delete('/:idProduct', _product.deleteProduct);
var _default = exports.default = router;