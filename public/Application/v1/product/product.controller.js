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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      return res.status(200).json([]);
    }
    const products = data.slice(offset, parseInt(offset, 10) + parseInt(limit, 10));
    return res.status(200).json({
      totalPages: Math.ceil(data.length / limit),
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
    const actualData = await _product.default.findById(idProduct);
    await (0, _cloudFile.deleteFile)(actualData.image.public_id);
    const data = await _product.default.deleteOne({
      _id: idProduct
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