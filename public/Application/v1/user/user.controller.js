"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.loginUser = exports.createUser = void 0;
var _Authentication = require("../../../Utils/Authentication");
var _user = _interopRequireDefault(require("./user.model"));
var _cryptPass = require("../../../Utils/cryptPass");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const loginUser = async (req, res) => {
  const {
    username,
    password
  } = req.body;
  const user = await _user.default.findOne({
    username
  });
  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    });
  }
  const isMatch = await (0, _cryptPass.comparePass)(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }
  const token = (0, _Authentication.genToken)(user._id);
  return res.header('auth-token', token).json({
    message: 'Login success'
  });
};
exports.loginUser = loginUser;
const createUser = async (req, res) => {
  const {
    name,
    username,
    password
  } = req.body;
  const user = await _user.default.findOne({
    username
  });
  if (user) {
    return res.status(409).json({
      message: 'User already exists'
    });
  }
  const newUser = {
    name,
    username,
    password: await (0, _cryptPass.encryptPass)(password)
  };
  try {
    const data = await _user.default.create(newUser);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error al crear el usuario',
      code: 500
    });
  }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
  const {
    idUser
  } = req;
  const {
    name,
    username,
    password
  } = req.body;
  const actualUser = await _user.default.findById(idUser);
  const user = await _user.default.findOne({
    username
  });
  if (user && actualUser.username !== username) {
    return res.status(400).json({
      message: 'User already exists'
    });
  }
  const updatedUser = {
    name,
    username,
    password: await (0, _cryptPass.encryptPass)(password)
  };
  try {
    const data = await _user.default.findByIdAndUpdate(idUser, updatedUser);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error updating user',
      code: 500
    });
  }
};
exports.updateUser = updateUser;