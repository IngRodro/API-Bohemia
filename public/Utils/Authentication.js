"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenValidation = void 0;
exports.genToken = genToken;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Token
} = (0, _config.default)();
const TokenValidation = (req, res, next) => {
  try {
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).json({
        message: 'Access Denied',
        code: 401
      });
    }
    const payload = _jsonwebtoken.default.verify(token, Token.secret || '');
    req.idUser = payload.idUser;
    return next();
  } catch (e) {
    return res.status(400).send({
      message: 'Invalid Token',
      code: 400
    });
  }
};
exports.TokenValidation = TokenValidation;
function genToken(idUser) {
  return _jsonwebtoken.default.sign({
    idUser
  }, Token.secret, {
    expiresIn: '1d'
  });
}