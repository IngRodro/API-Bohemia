"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _getModelName = _interopRequireDefault(require("../../../Utils/getModelName"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Schema
} = _mongoose.default;
const {
  singularName,
  pluralName
} = (0, _getModelName.default)('restaurant');
const restaurant = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active'
  },
  department: {
    type: String,
    required: true
  },
  municipality: {
    type: String,
    required: true
  },
  direction: {
    type: String,
    required: true
  },
  delivery: {
    type: Boolean,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  openingHour: {
    type: String,
    required: true
  },
  closingHour: {
    type: String,
    required: true
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
    ref: 'user',
    required: true
  }
}, {
  versionKey: false
});

// Ensure virtual fields are serialised.
restaurant.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
  }
});

// rename name Example to singular Model
var _default = _mongoose.default.models[singularName] || _mongoose.default.model(pluralName, restaurant);
exports.default = _default;