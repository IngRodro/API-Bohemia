"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeDB = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  database
} = (0, _config.default)();
const initializeDB = async callback => {
  try {
    _mongoose.default.connect(database.uri, database.options, callback);
    console.log('MongoDB connect successfully');
    return _mongoose.default;
  } catch (error) {
    console.log('***** Mongoose failed connection *****');
    console.error(error);
    return null;
  }
};
exports.initializeDB = initializeDB;