"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifiedProductOnMenu = exports.updateMenu = exports.getMenu = exports.deleteMenu = exports.createMenu = void 0;
var _getPagination = require("../../../Utils/getPagination");
var _menuOptions = _interopRequireDefault(require("./menuOptions.model"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const verifiedProductOnMenu = async idProduct => {
  const data = await _menuOptions.default.find({
    status: 'active'
  }).populate('products.product', ['_id', 'name', 'image']);
  const dataParse = JSON.parse(JSON.stringify(data));
  let result = false;
  await dataParse.forEach(menuOption => {
    menuOption.products.forEach(product => {
      if (product.product.id === idProduct) {
        result = true;
      }
    });
  });
  return result;
};
exports.verifiedProductOnMenu = verifiedProductOnMenu;
const getMenu = async (req, res) => {
  const {
    idRestaurant
  } = req.params;
  const {
    page,
    size
  } = req.query;
  const {
    limit,
    offset
  } = (0, _getPagination.getPagination)(page, size);
  try {
    const data = await _menuOptions.default.find({
      restaurant: idRestaurant,
      status: 'active'
    }).populate('products.product', ['_id', 'name', 'image']);
    if (offset >= data.length) {
      return res.status(404).json({
        message: 'Not found'
      });
    }
    const menus = data.slice(offset, parseInt(offset, 10) + parseInt(limit, 10));
    return res.status(200).json({
      menus,
      currentPage: page,
      numberOfItems: menus.length,
      prevPage: page - 1 > 0 ? page - 1 : null,
      nextPage: offset + menus.length < data.length ? parseInt(page, 10) + 1 : null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error obtaining data',
      code: 500
    });
  }
};
exports.getMenu = getMenu;
const createMenu = async (req, res) => {
  const {
    name,
    restaurant,
    products,
    price,
    type
  } = req.body;
  if (!name || !restaurant || !products || !price || !type) {
    return res.status(400).json({
      message: 'All fields are required',
      code: 400
    });
  }
  try {
    const data = await _menuOptions.default.create({
      name,
      restaurant,
      products,
      price,
      type
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating Option menu',
      code: 500
    });
  }
};
exports.createMenu = createMenu;
const updateMenu = async (req, res) => {
  const {
    name,
    products,
    price,
    type
  } = req.body;
  const {
    idMenu
  } = req.params;
  if (!name || !products || !price || !type) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }
  try {
    const data = await _menuOptions.default.findOneAndUpdate({
      _id: idMenu
    }, {
      name,
      products,
      price,
      type
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error updating Option menu'
    });
  }
};
exports.updateMenu = updateMenu;
const deleteMenu = async (req, res) => {
  const {
    params
  } = req;
  const {
    idMenu
  } = params;
  try {
    const data = await _menuOptions.default.findOneAndUpdate({
      _id: idMenu
    }, {
      status: 'inactive'
    });
    return res.status(200).json(_objectSpread(_objectSpread({}, data), {}, {
      status: 'inactive'
    }));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Error deleting Option menu'
    });
  }
};
exports.deleteMenu = deleteMenu;