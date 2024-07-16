"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifiedProductOnMenu = exports.updateMenu = exports.getMenu = exports.deleteMenu = exports.createMenu = void 0;
var _getPagination = require("../../../Utils/getPagination");
var _menuOptions = _interopRequireDefault(require("./menuOptions.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    }).populate('products.product', ['_id', 'name', 'image']).populate('restaurant', ['_id', 'name', 'image']);
    if (offset >= data.length) {
      return res.status(404).json({
        message: 'Not found'
      });
    }
    const menus = data.slice(offset, parseInt(offset, 10) + parseInt(limit, 10));
    return res.status(200).json({
      totalPages: Math.ceil(data.length / limit),
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