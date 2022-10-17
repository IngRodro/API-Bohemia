"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProduct = exports.getAllProduct = exports.deleteProduct = exports.createProduct = void 0;
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _getPagination = require("../../../Utils/getPagination");
var _product = _interopRequireDefault(require("./product.model"));
var _cloudFile = require("../../../Utils/cloudFile");
var _menuOptions = require("../menuOptions/menuOptions.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const getAllProduct = async (req, res) => {
  const {
    idUser
  } = req;
  const {
    page,
    size
  } = req.query;
  const {
    limit,
    offset
  } = (0, _getPagination.getPagination)(page, size);
  try {
    const data = await _product.default.find({
      user: idUser,
      status: 'active'
    });
    if (offset >= data.length) {
      return res.status(404).json({
        message: 'Not found'
      });
    }
    const products = data.slice(offset, parseInt(offset, 10) + parseInt(limit, 10));
    return res.status(200).json({
      products,
      currentPage: page ? parseInt(page, 10) : 1,
      numberOfItems: products.length,
      prevPage: page - 1 > 0 ? page - 1 : null,
      nextPage: offset + products.length < data.length ? parseInt(page, 10) + 1 : null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error al obtener los datos',
      code: 500
    });
  }
};
exports.getAllProduct = getAllProduct;
const createProduct = async (req, res) => {
  const {
    name
  } = req.body;
  const {
    files,
    idUser
  } = req;
  if (!files) {
    return res.status(400).json({
      message: 'Not file uploaded'
    });
  }
  try {
    let image = {};
    const result = await (0, _cloudFile.uploadFile)(req.files.image.tempFilePath, 'products');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url
    };
    const product = await _product.default.create({
      name,
      user: idUser,
      image
    });
    _fsExtra.default.unlinkSync(req.files.image.tempFilePath);
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating product',
      code: 500
    });
  }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
  const {
    idProduct
  } = req.params;
  const {
    name
  } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }
  if (!req.files?.image) {
    const data = await _product.default.findOneAndUpdate({
      _id: idProduct
    }, {
      name
    });
    return res.status(200).json(data);
  }
  try {
    let image = {};
    const actualData = await _product.default.findById(idProduct);
    await (0, _cloudFile.deleteFile)(actualData.image.public_id);
    const result = await (0, _cloudFile.uploadFile)(req.files.image.tempFilePath, 'products');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url
    };
    await _fsExtra.default.unlink(req.files.image.tempFilePath);
    const data = await _product.default.findOneAndUpdate({
      _id: idProduct
    }, {
      name,
      image
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error updating product'
    });
  }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
  const {
    idProduct
  } = req.params;
  const validate = await (0, _menuOptions.verifiedProductOnMenu)(idProduct);
  if (validate) {
    return res.status(400).json({
      message: "The product is being used in a menu option, you can't delete it",
      code: 400
    });
  }
  try {
    const data = await _product.default.findOneAndUpdate({
      _id: idProduct
    }, {
      status: 'inactive'
    });
    return res.status(200).json(_objectSpread(_objectSpread({}, data), {}, {
      status: 'inactive'
    }));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error deleting product'
    });
  }
};
exports.deleteProduct = deleteProduct;