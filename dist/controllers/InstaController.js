'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = list;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();


var url = 'https://api.instagram.com/v1/users/self/media/recent?access_token=';
var accessToken = process.env.INSTATOKEN;

function list(req, res) {
  _axios2.default.get('' + url + accessToken).then(function (response) {
    return res.json(response.data);
  }).catch(function (error) {
    console.log(error);
  });
}