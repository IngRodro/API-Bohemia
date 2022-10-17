"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRestaurant = exports.getRestaurantByUser = exports.getRestaurantByLocation = exports.deleteRestaurant = exports.createRestaurant = void 0;
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _getPagination = require("../../../Utils/getPagination");
var _restaurant = _interopRequireDefault(require("./restaurant.model"));
var _cloudFile = require("../../../Utils/cloudFile");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const getRestaurantByUser = async (req, res) => {
  const {
    idUser
  } = req;
  try {
    const data = await _restaurant.default.find({
      status: 'active',
      user: idUser
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error obtaining data',
      code: 500
    });
  }
};
exports.getRestaurantByUser = getRestaurantByUser;
const getRestaurantByLocation = async (req, res) => {
  const {
    department,
    municipality,
    page,
    size
  } = req.query;
  const {
    offset,
    limit
  } = (0, _getPagination.getPagination)(page, size);
  try {
    let data;
    if (municipality) {
      data = await _restaurant.default.find({
        department,
        municipality,
        status: 'active'
      });
    } else {
      data = municipality ? await _restaurant.default.find({
        department,
        status: 'active'
      }) : await _restaurant.default.find({
        status: 'active'
      });
    }
    if (offset >= data.length) {
      return res.status(404).json({
        message: 'Not found'
      });
    }
    const restaurants = data.slice(offset, parseInt(offset, 10) + parseInt(limit, 10));
    return res.status(200).json({
      restaurants,
      currentPage: page ? parseInt(page, 10) : 1,
      numberOfItems: restaurants.length,
      prevPage: page - 1 > 0 ? page - 1 : null,
      nextPage: offset + restaurants.length < data.length ? parseInt(page || 1, 10) + 1 : null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error obtaining data',
      code: 500
    });
  }
};
exports.getRestaurantByLocation = getRestaurantByLocation;
const createRestaurant = async (req, res) => {
  const {
    name,
    email,
    department,
    municipality,
    direction,
    delivery,
    phone,
    openingHour,
    closingHour
  } = req.body;
  const {
    idUser
  } = req;
  if (!name || !department || !municipality || !direction || !delivery || !phone || !openingHour || !closingHour || !idUser) {
    return res.status(400).json({
      message: 'All fields are required',
      code: 400
    });
  }
  if (!req.files?.image) {
    return res.status(400).json({
      message: 'Not file uploaded',
      code: 400
    });
  }
  try {
    let image = {};
    const result = await (0, _cloudFile.uploadFile)(req.files.image.tempFilePath, 'restaurants');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url
    };
    await _fsExtra.default.unlink(req.files.image.tempFilePath);
    const data = await _restaurant.default.create({
      name,
      email,
      department,
      municipality,
      direction,
      delivery,
      phone,
      openingHour,
      closingHour,
      image,
      user: idUser
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error creating new restaurant',
      code: 500
    });
  }
};
exports.createRestaurant = createRestaurant;
const updateRestaurant = async (req, res) => {
  const {
    idRestaurant
  } = req.params;
  const {
    name,
    email,
    department,
    municipality,
    direction,
    delivery,
    phone,
    openingHour,
    closingHour
  } = req.body;
  if (!name || !department || !municipality || !direction || !delivery || !phone || !openingHour || !closingHour) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }
  if (!req.files?.image) {
    try {
      const data = await _restaurant.default.findOneAndUpdate({
        _id: idRestaurant
      }, {
        name,
        email,
        department,
        municipality,
        direction,
        delivery,
        phone,
        openingHour,
        closingHour
      });
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Error updating restaurant',
        code: 500
      });
    }
  }
  try {
    let image = {};
    const actualData = await _restaurant.default.findById(idRestaurant);
    await (0, _cloudFile.deleteFile)(actualData.image.public_id);
    const result = await (0, _cloudFile.uploadFile)(req.files.image.tempFilePath, 'restaurants');
    image = {
      public_id: result.public_id,
      secure_url: result.secure_url
    };
    await _fsExtra.default.unlink(req.files.image.tempFilePath);
    const data = await _restaurant.default.findOneAndUpdate({
      _id: idRestaurant
    }, {
      name,
      email,
      department,
      municipality,
      direction,
      delivery,
      phone,
      openingHour,
      closingHour,
      image
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Don't cant update the restaurant"
    });
  }
};
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = async (req, res) => {
  try {
    const {
      idRestaurant
    } = req.params;
    const data = await _restaurant.default.findOneAndUpdate({
      _id: idRestaurant
    }, {
      status: 'inactive'
    });
    return res.status(200).json(_objectSpread(_objectSpread({}, data), {}, {
      status: 'inactive'
    }));
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Don't cant delete the restaurant"
    });
  }
};
exports.deleteRestaurant = deleteRestaurant;