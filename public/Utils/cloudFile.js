"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = exports.deleteFile = void 0;
var _cloudinary = require("cloudinary");
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  imageCloud
} = (0, _config.default)();
_cloudinary.v2.config({
  cloud_name: imageCloud.cloud_name,
  api_key: imageCloud.api_key,
  api_secret: imageCloud.api_secret
});
const uploadFile = async (filePath, folder) => _cloudinary.v2.uploader.upload(filePath, {
  folder: `images/${folder}`
});
exports.uploadFile = uploadFile;
const deleteFile = async publicId => _cloudinary.v2.uploader.destroy(publicId);
exports.deleteFile = deleteFile;