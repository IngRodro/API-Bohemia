"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singularName = exports.pluralName = exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _getModelName = _interopRequireDefault(require("../../../Utils/getModelName"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  Schema
} = _mongoose.default;
const {
  singularName,
  pluralName
} = (0, _getModelName.default)('user');
exports.pluralName = pluralName;
exports.singularName = singularName;
const user = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active'
  },
  password: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true,
    unique: true
  }
}, {
  versionKey: false
});

// Ensure virtual fields are serialised.
user.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  }
});

// rename name Example to singular Model
var _default = exports.default = _mongoose.default.models[singularName] || _mongoose.default.model(pluralName, user);