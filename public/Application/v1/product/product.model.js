"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singularName = exports.pluralName = exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _getModelName = _interopRequireDefault(require("../../../Utils/getModelName"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Schema
} = _mongoose.default;
const {
  singularName,
  pluralName
} = (0, _getModelName.default)('product');
exports.pluralName = pluralName;
exports.singularName = singularName;
const product = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active'
  },
  image: {
    public_id: {
      type: String,
      required: true
    },
    secure_url: {
      type: String,
      required: true
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  }
}, {
  versionKey: false
});

// Ensure virtual fields are serialised.
product.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  }
});

// rename name Example to singular Model
var _default = _mongoose.default.models[singularName] || _mongoose.default.model(pluralName, product);
exports.default = _default;