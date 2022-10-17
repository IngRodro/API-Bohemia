"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagination = void 0;
const getPagination = (page, size) => {
  const limit = size || 10;
  const offset = page ? (page - 1) * limit : 0;
  return {
    limit,
    offset
  };
};
exports.getPagination = getPagination;